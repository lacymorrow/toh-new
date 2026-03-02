import type React from "react";

interface Args {
	children: React.ReactNode;
}

const Layout = ({ children }: Args) => {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
};

export default Layout;
