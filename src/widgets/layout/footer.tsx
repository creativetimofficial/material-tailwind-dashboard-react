import { Typography } from "@material-tailwind/react";
import { HeartIcon } from "@heroicons/react/24/solid";

// Define interfaces for props
interface FooterRoute {
  name: string;
  path: string;
}

interface FooterProps {
  brandName?: string;
  brandLink?: string;
  routes?: FooterRoute[];
}

// Default props values
const defaultBrandName = "Creative Tim";
const defaultBrandLink = "https://www.creative-tim.com";
const defaultRoutes: FooterRoute[] = [
  { name: "Creative Tim", path: "https://www.creative-tim.com" },
  { name: "About Us", path: "https://www.creative-tim.com/presentation" },
  { name: "Blog", path: "https://www.creative-tim.com/blog" },
  { name: "License", path: "https://www.creative-tim.com/license" },
];

export function Footer({
  brandName = defaultBrandName,
  brandLink = defaultBrandLink,
  routes = defaultRoutes,
}: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="py-2">
      <div className="flex w-full flex-wrap items-center justify-center gap-6 px-2 md:justify-between">
        <Typography variant="small" className="font-normal text-inherit">
          &copy; {year}, made with{" "}
          <HeartIcon className="-mt-0.5 inline-block h-3.5 w-3.5 text-red-600" /> by{" "}
          <a
            href={brandLink} // brandLink is string
            target="_blank"
            rel="noopener noreferrer" // Added for security
            className="transition-colors hover:text-blue-500 font-bold"
          >
            {brandName} {/* brandName is string */}
          </a>{" "}
          for a better web.
        </Typography>
        <ul className="flex items-center gap-4">
          {/* routes is FooterRoute[] */}
          {routes.map(({ name, path }: FooterRoute) => (
            <li key={name}>
              <Typography
                as="a"
                href={path} // path is string
                target="_blank"
                rel="noopener noreferrer" // Added for security
                variant="small"
                className="py-0.5 px-1 font-normal text-inherit transition-colors hover:text-blue-500"
              >
                {name} {/* name is string */}
              </Typography>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

// PropTypes and defaultProps are removed.

Footer.displayName = "/src/widgets/layout/footer.tsx"; // Updated displayName

export default Footer;
