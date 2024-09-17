import "./globals.css";


export const metadata = {
  title: "Placeholder",
  description: "Under construction",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="max-w-[800px] m-auto">
        {children}
      </body>
    </html>
  );
}
