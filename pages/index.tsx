/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Link from "next/link";
import FormControl from "@mui/joy/FormControl";
import FormHelperText from "@mui/joy/FormHelperText";
import Typography from "@mui/joy/Typography";
import Card from "@mui/joy/Card";
import CardCover from "@mui/joy/CardCover";
import CardContent from "@mui/joy/CardContent";
import Image from "next/future/image";
import homePic from "../public/img/home.jpg";
import InputCitySearch from "../components/input-city-search";
import Box from "@mui/joy/Box";
import { getLeases } from "../utils/fetch/fetchLease";
import { ILease } from "../interfaces/lease";
import LeaseCard from "../components/lease-card";
import Divider from "@mui/joy/Divider";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const Home: NextPage = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <>
      <header>
        <Box sx={{ margin: "0 0 60px 0", width: "65%" }}>
          <Typography
            component="h1"
            level="h1"
            fontFamily="Bitter"
            fontSize={48}
            fontWeight={800}
            lineHeight={1.2}
          >
            Locations et sous-locations temporaires entre particuliers
          </Typography>
          <Typography component="h2" level="h5" marginTop={2} fontWeight={300}>
            Réalisez vos projets en découvrant nos offres de locations de
            courtes durées sans frais d’agence 🙌
          </Typography>
        </Box>

        <Card sx={{ height: "300px" }}>
          <CardCover>
            <Image
              src={homePic}
              alt="Picture of a parisian appartment"
              placeholder="blur"
            />
          </CardCover>
          <CardContent>
            <FormControl sx={{ my: "auto", ml: "30px" }}>
              <Typography level="h4" mb={3}>
                Dans quelle ville cherchez-vous ?
              </Typography>
              <InputCitySearch isLarge={true} />
              <FormHelperText sx={{ mt: 2 }}>
                <Link href="/leases">Voir toutes les annonces</Link>
              </FormHelperText>
            </FormControl>
          </CardContent>
        </Card>
      </header>
      <main>
        <Typography
          level="h3"
          marginTop="60px"
          marginBottom="30px"
          fontFamily="Bitter"
          fontWeight={600}
        >
          Dernières annonces publiées
        </Typography>

        {!!data.totalCount && (
          <Box sx={{ display: "flex", gap: 6 }}>
            <Box flex="1 1">
              {data.leases.slice(0, 3).map((lease: ILease, index: number) => (
                <Link href={`/leases/${lease.id}`} key={lease.id}>
                  <Box sx={{ cursor: "pointer" }}>
                    {index !== 0 && <Divider />}
                    <LeaseCard lease={lease} />
                  </Box>
                </Link>
              ))}
            </Box>
            <Box
              flex="0 0 300px"
              sx={{ backgroundColor: "#ccc", borderRadius: "10px" }}
            >
              hello
            </Box>
          </Box>
        )}

        <Typography
          level="h3"
          marginTop="60px"
          marginBottom="30px"
          fontFamily="Bitter"
          fontWeight={600}
        >
          Questions fréquentes
        </Typography>
      </main>
    </>
  );
};

export default Home;

/* -------------------------------------------------------------------------- */
/*                              SERVER SIDE PROPS                             */
/* -------------------------------------------------------------------------- */
export const getServerSideProps: GetServerSideProps = async () => {
  const data = await getLeases();
  return {
    props: { data },
  };
};
