import { IDetailsSummary } from "../interfaces/IDetailsSummary";

export const FREQUENTLY_ASKED_QUESTIONS: IDetailsSummary[] = [
  {
    summary:
      "Proposez-vous des annonces pour les locations vides ou meublées ?",
    details: [
      "Ce type de location n'est pas pris en charge par la plateforme car nous préferrons proposer des bails et contrats allant de quelques semaines à quelques mois afin de favoriser la mobilité.",
    ],
  },
  {
    summary:
      "Combien cela coûte de publier ou de répondre à une annonce de location ?",
    details: [
      "Le service est gratuit car le développement du site est issu d'un projet personnel et que nous l'hébergeons avec des offres gratuites. Cependant des limitations s'appliquent, notamment pour le nombre d'annonces et de photos qu'il est possible de publier.",
      "Vos données personnelles ne sont pas revendues et nous ne spammons pas.",
    ],
  },
  {
    summary: "La sous-location est-elle légale ? Comment procéder ?",
    details: [
      "La sous-location est légale avec l'accord, de préférence écrit, du propriétaire.",
      "Nous vous recommandons de signer un contrat avec le sous-locataire pour le logement que vous souhaitez sous-louer. Faites-y mentionner les dates et le prix du loyer ainsi que le montant de la caution si vous en demandez une.",
    ],
  },
  {
    summary:
      "Les annonces de locations ou de sous-locations sont-elles vérifiées ?",
    details: [
      "De part sa petite taille et la gratuité du service, nous ne disposons pas d'une équipe de modération. Il vous convient donc de prendre toutes les précautions d'usage lors de vos échanges. Par exemple n'envoyez jamais d'argent à l'avance.",
      "Il est cependant possible pour un utilisateur connecté de signaler une annonce suspecte. Celle-ci sera alors analysée rapidement et retirée si elle s'avère dangereuse ou illégale.",
      "La carte des logements décline toute responsabilité dans l'utilisation qui est faite de ses services ainsi que de ses conséquences éventuelles.",
    ],
  },
];
