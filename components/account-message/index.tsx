/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import Link from "next/link";
import { Box, Button, Chip, Typography } from "@mui/joy";
import { ILease } from "../../interfaces/lease";
import { IAccountMessage } from "../../interfaces/lease/IAccountMessage";
import { convertLeaseType } from "../../utils/convertLeaseType";
import LaunchIcon from "@mui/icons-material/Launch";
import styles from "./account-message.module.css";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const AccountMessage = ({
  lease,
}: {
  lease: ILease & { leaseMessages: IAccountMessage[] };
}) => {
  return (
    <details className={styles.details}>
      <summary>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography level="h6" marginRight={2}>
            {lease.city}
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Chip size="sm" color="neutral">
              {lease.pricePerMonth}€
            </Chip>
            <Chip size="sm" color="neutral" variant="soft">
              {convertLeaseType(lease.type)}
            </Chip>
            <Chip size="sm" color="neutral" variant="soft">
              {lease.room} {lease.room > 1 ? "pièces" : "pièce"}
            </Chip>
            <Chip size="sm" color="neutral" variant="soft">
              {lease.surface}m2
            </Chip>
          </Box>
          <Typography color="info" marginLeft="auto" fontSize="0.9rem">
            Voir le message
          </Typography>
        </Box>
      </summary>
      {lease.leaseMessages.map((message) => (
        <div key={message.id} className={styles.content}>
          <Typography>{message.content}</Typography>
          <Typography level="body2" marginTop={1}>
            Envoyé le {message.createdAt}
          </Typography>
        </div>
      ))}
      <Link href={`/leases/${lease.id}`} target="_blank">
        <Button
          variant="outlined"
          color="neutral"
          size="sm"
          startDecorator={<LaunchIcon fontSize="inherit" />}
        >
          Voir l'annonce
        </Button>
      </Link>
    </details>
  );
};

export default AccountMessage;
