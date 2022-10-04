/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Typography from "@mui/joy/Typography";
import Chip from "@mui/joy/Chip";
import Sheet from "@mui/joy/Sheet";
import List from "@mui/joy/List";
import styles from "./LeaseCard.module.css";
import ListItem from "@mui/joy/ListItem";
import Image from "next/image";
import { CardContent } from "@mui/joy";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
export const LeaseCard: React.FC = () => {
  return (
    <Card row sx={{ width: 560 }}>
      <CardOverflow>
        <AspectRatio ratio="16/11.2" sx={{ width: 260 }}>
          <Image src="https://picsum.photos/seed/picsum/1200" layout="fill" />
        </AspectRatio>
      </CardOverflow>

      <CardContent sx={{ pl: 2 }}>
        <Sheet
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography level="h4" fontWeight="600">
            Lyon
          </Typography>
          <Typography level="h5" fontWeight="300">
            700€ CC
          </Typography>
        </Sheet>

        <Sheet sx={{ mt: 2, mb: 3 }}>
          <Typography level="body2">
            Du 01 mars 2022 au 11 juillet 2022
          </Typography>
          <Chip variant="soft" color="neutral" size="sm" sx={{ mt: 0.5 }}>
            Dates flexibles
          </Chip>
        </Sheet>

        <Sheet
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Chip size="sm" sx={{ mr: 0.75 }}>
            Sous-location
          </Chip>
          <Chip variant="outlined" size="sm" sx={{ mr: 0.75 }}>
            2 pièces
          </Chip>
          <Chip variant="outlined" size="sm">
            47m2
          </Chip>
        </Sheet>
      </CardContent>
    </Card>
  );
};
