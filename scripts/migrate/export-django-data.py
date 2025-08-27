#!/usr/bin/env python
"""
Export data from Django/Wagtail database to JSON files for migration to Next.js

Usage:
    python export-django-data.py

This script should be run from the Django project directory (TOH)
"""

import os
import sys
import json
import django
from datetime import datetime, date
from decimal import Decimal

# Add Django project to path
sys.path.insert(0, '/Users/lacy/repo/TOH')
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'harmonycms.settings.development')

# Initialize Django
django.setup()

# Import Django models
from django.contrib.auth.models import User
from wagtail.models import Page
from core.home.models import HomePage, Gallery, GalleryImage
from core.news.models import NewsPage, NewsDetailPage
from custom.events.models import EventsPage, EventPage
from custom.business.models import BusinessPage, BusinessDetailPage
from custom.elections.models import ElectionPage
from custom.history.models import HistoryPage
from custom.permits.models import PermitPage
from custom.meetings.models import MeetingPage
from custom.emergency.models import EmergencyPage

class DateTimeEncoder(json.JSONEncoder):
    """Custom JSON encoder for Django model serialization"""
    def default(self, obj):
        if isinstance(obj, (datetime, date)):
            return obj.isoformat()
        elif isinstance(obj, Decimal):
            return float(obj)
        return super().default(obj)

def export_users():
    """Export user data"""
    users = []
    for user in User.objects.all():
        users.append({
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'is_staff': user.is_staff,
            'is_superuser': user.is_superuser,
            'is_active': user.is_active,
            'date_joined': user.date_joined,
            'last_login': user.last_login,
        })
    return users

def export_news():
    """Export news articles"""
    news_items = []
    
    # Get all NewsDetailPage instances
    for page in NewsDetailPage.objects.live():
        # Extract content from StreamField
        content_blocks = []
        if hasattr(page, 'body'):
            for block in page.body:
                content_blocks.append({
                    'type': block.block_type,
                    'value': str(block.value)
                })
        
        news_items.append({
            'id': page.id,
            'title': page.title,
            'slug': page.slug,
            'date': page.date if hasattr(page, 'date') else None,
            'content_blocks': content_blocks,
            'seo_title': page.seo_title,
            'search_description': page.search_description,
            'first_published_at': page.first_published_at,
            'last_published_at': page.last_published_at,
            'live': page.live,
            'owner_id': page.owner_id if page.owner else None,
        })
    
    return news_items

def export_events():
    """Export events"""
    events = []
    
    for page in EventPage.objects.live():
        # Extract content from StreamField
        content_blocks = []
        if hasattr(page, 'body'):
            for block in page.body:
                content_blocks.append({
                    'type': block.block_type,
                    'value': str(block.value)
                })
        
        # Extract event-specific fields from blocks
        event_date = None
        event_time = None
        location = None
        
        # Try to extract from structured blocks
        for block in content_blocks:
            if block['type'] == 'event_info':
                # Parse event info block for details
                pass
        
        events.append({
            'id': page.id,
            'title': page.title,
            'slug': page.slug,
            'event_date': page.event_date if hasattr(page, 'event_date') else event_date,
            'event_time': page.event_time if hasattr(page, 'event_time') else event_time,
            'location': page.location if hasattr(page, 'location') else location,
            'content_blocks': content_blocks,
            'seo_title': page.seo_title,
            'search_description': page.search_description,
            'first_published_at': page.first_published_at,
            'last_published_at': page.last_published_at,
            'live': page.live,
            'owner_id': page.owner_id if page.owner else None,
        })
    
    return events

def export_businesses():
    """Export business directory entries"""
    businesses = []
    
    try:
        for page in BusinessDetailPage.objects.live():
            content_blocks = []
            if hasattr(page, 'body'):
                for block in page.body:
                    content_blocks.append({
                        'type': block.block_type,
                        'value': str(block.value)
                    })
            
            businesses.append({
                'id': page.id,
                'title': page.title,
                'slug': page.slug,
                'content_blocks': content_blocks,
                'seo_title': page.seo_title,
                'search_description': page.search_description,
                'first_published_at': page.first_published_at,
                'last_published_at': page.last_published_at,
                'live': page.live,
                'owner_id': page.owner_id if page.owner else None,
            })
    except:
        print("BusinessDetailPage model not found, skipping...")
    
    return businesses

def export_pages():
    """Export general Wagtail pages"""
    pages = []
    
    # Get all pages except specific types we're handling separately
    exclude_types = [NewsDetailPage, EventPage, HomePage]
    
    for page in Page.objects.live():
        # Skip if it's a specific type we're handling elsewhere
        if any(isinstance(page.specific, t) for t in exclude_types):
            continue
        
        page_data = {
            'id': page.id,
            'title': page.title,
            'slug': page.slug,
            'url_path': page.url_path,
            'content_type': page.content_type.model,
            'seo_title': page.seo_title,
            'search_description': page.search_description,
            'first_published_at': page.first_published_at,
            'last_published_at': page.last_published_at,
            'live': page.live,
            'owner_id': page.owner_id if page.owner else None,
        }
        
        # Try to get body content if it exists
        specific_page = page.specific
        if hasattr(specific_page, 'body'):
            content_blocks = []
            for block in specific_page.body:
                content_blocks.append({
                    'type': block.block_type,
                    'value': str(block.value)
                })
            page_data['content_blocks'] = content_blocks
        
        pages.append(page_data)
    
    return pages

def export_media():
    """Export media file references"""
    from wagtail.images.models import Image
    from wagtail.documents.models import Document
    
    media = {
        'images': [],
        'documents': []
    }
    
    # Export images
    for image in Image.objects.all():
        media['images'].append({
            'id': image.id,
            'title': image.title,
            'file': image.file.name if image.file else None,
            'width': image.width,
            'height': image.height,
            'created_at': image.created_at,
            'uploaded_by_user_id': image.uploaded_by_user_id,
        })
    
    # Export documents
    for doc in Document.objects.all():
        media['documents'].append({
            'id': doc.id,
            'title': doc.title,
            'file': doc.file.name if doc.file else None,
            'created_at': doc.created_at,
            'uploaded_by_user_id': doc.uploaded_by_user_id,
        })
    
    return media

def main():
    """Main export function"""
    output_dir = '/Users/lacy/repo/TOH-new/scripts/migrate/data'
    os.makedirs(output_dir, exist_ok=True)
    
    print("Starting Django data export...")
    
    # Export users
    print("Exporting users...")
    users = export_users()
    with open(os.path.join(output_dir, 'users.json'), 'w') as f:
        json.dump(users, f, cls=DateTimeEncoder, indent=2)
    print(f"  Exported {len(users)} users")
    
    # Export news
    print("Exporting news articles...")
    news = export_news()
    with open(os.path.join(output_dir, 'news.json'), 'w') as f:
        json.dump(news, f, cls=DateTimeEncoder, indent=2)
    print(f"  Exported {len(news)} news articles")
    
    # Export events
    print("Exporting events...")
    events = export_events()
    with open(os.path.join(output_dir, 'events.json'), 'w') as f:
        json.dump(events, f, cls=DateTimeEncoder, indent=2)
    print(f"  Exported {len(events)} events")
    
    # Export businesses
    print("Exporting businesses...")
    businesses = export_businesses()
    with open(os.path.join(output_dir, 'businesses.json'), 'w') as f:
        json.dump(businesses, f, cls=DateTimeEncoder, indent=2)
    print(f"  Exported {len(businesses)} businesses")
    
    # Export general pages
    print("Exporting general pages...")
    pages = export_pages()
    with open(os.path.join(output_dir, 'pages.json'), 'w') as f:
        json.dump(pages, f, cls=DateTimeEncoder, indent=2)
    print(f"  Exported {len(pages)} pages")
    
    # Export media
    print("Exporting media references...")
    media = export_media()
    with open(os.path.join(output_dir, 'media.json'), 'w') as f:
        json.dump(media, f, cls=DateTimeEncoder, indent=2)
    print(f"  Exported {len(media['images'])} images and {len(media['documents'])} documents")
    
    print("\nExport complete! Files saved to:", output_dir)

if __name__ == '__main__':
    main()