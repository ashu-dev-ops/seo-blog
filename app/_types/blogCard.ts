export interface BlogCardProps {
  title: string;
  blogId: string;
  readTime: string; // You can use a specific type like "number" if readTime is a number
  thumbnail: string; // Assuming thumbnail is a URL or an image path
  slug: String;
}
export interface DashboardNavButtonProps {
  path: string;
  text: string;
  icon?: SVGRectElement;
}
