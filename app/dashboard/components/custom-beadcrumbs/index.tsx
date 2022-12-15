/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import Link from "next/link";
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Typography from "@mui/joy/Typography";

/* -------------------------------------------------------------------------- */
/*                                  INTERFACE                                 */
/* -------------------------------------------------------------------------- */
interface IBreadcrumbPrevPage {
  key: string;
  name: string;
  href: string;
}

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const CustomBreadcrumbs = ({
  currentPage,
  prevPages,
}: {
  currentPage: string;
  prevPages?: IBreadcrumbPrevPage[];
}) => {
  return (
    <Breadcrumbs separator="›" sx={{ fontSize: "1.6rem", padding: 0 }}>
      {prevPages &&
        prevPages.map((page: IBreadcrumbPrevPage) => (
          <Link key={page.key} href={page.href}>
            <Typography
              fontSize="inherit"
              fontWeight="300"
              sx={{ color: "#707070", cursor: "pointer" }}
            >
              {page.name}
            </Typography>
          </Link>
        ))}
      <Typography fontSize="inherit" fontWeight={500}>
        {currentPage}
      </Typography>
    </Breadcrumbs>
  );
};

export default CustomBreadcrumbs;
