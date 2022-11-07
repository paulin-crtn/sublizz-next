/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import Breadcrumbs from "@mui/joy/Breadcrumbs";
import Link from "@mui/joy/Link";
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
    <Breadcrumbs separator="›" sx={{ fontSize: "1.6rem" }}>
      {prevPages &&
        prevPages.map((page: IBreadcrumbPrevPage) => (
          <Link
            key={page.key}
            href={page.href}
            underline="none"
            color="neutral"
            fontSize="inherit"
            fontWeight="300"
          >
            {page.name}
          </Link>
        ))}
      <Typography fontSize="inherit" fontWeight={500}>
        {currentPage}
      </Typography>
    </Breadcrumbs>
  );
};

export default CustomBreadcrumbs;
