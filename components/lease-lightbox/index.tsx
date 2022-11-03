/* -------------------------------------------------------------------------- */
/*                                   IMPORTS                                  */
/* -------------------------------------------------------------------------- */
import { Dispatch, SetStateAction, useEffect } from "react";
import Lightbox, { ImagesListType } from "react-spring-lightbox";
import Typography from "@mui/joy/Typography";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const LeaseLightbox = ({
  images,
  open,
  setOpen,
  currentImageIndex,
  setCurrentImageIndex,
}: {
  images: ImagesListType;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  currentImageIndex: number;
  setCurrentImageIndex: Dispatch<SetStateAction<number>>;
}) => {
  /* ------------------------------ REACT EFFECT ------------------------------ */
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    });
  }, []);

  /* -------------------------------- FUNCTIONS ------------------------------- */
  const gotoPrevious = () =>
    currentImageIndex > 0 && setCurrentImageIndex(currentImageIndex - 1);

  const gotoNext = () =>
    currentImageIndex + 1 < images.length &&
    setCurrentImageIndex(currentImageIndex + 1);

  /* -------------------------------- TEMPLATE -------------------------------- */
  return (
    <Lightbox
      isOpen={open}
      onPrev={gotoPrevious}
      onNext={gotoNext}
      images={images}
      currentIndex={currentImageIndex}
      /* Add your own UI */
      renderHeader={() => (
        <CustomHeader
          currentImageIndex={currentImageIndex}
          imageCount={images.length}
          setOpen={setOpen}
        />
      )}
      // renderFooter={() => (<CustomFooter />)}
      renderPrevButton={() => (
        <CustomLeftArrowButton
          show={currentImageIndex !== 0}
          gotoPrevious={gotoPrevious}
        />
      )}
      renderNextButton={() => (
        <CustomRightArrowButton
          show={currentImageIndex !== images.length - 1}
          gotoNext={gotoNext}
        />
      )}
      // renderImageOverlay={() => (<ImageOverlayComponent >)}

      /* Add styling */
      // className="cool-class"
      style={{
        background: "rgba(0, 0, 0, 0.95)",
        zIndex: 1000,
      }}
      /* Handle closing */
      // onClose={handleClose}

      /* Use single or double click to zoom */
      // singleClickToZoom

      /* react-spring config for open/close animation */
      pageTransitionConfig={{
        from: { transform: "translateY(100vh)", opacity: 1 },
        enter: { transform: "translateY(0px)", opacity: 1 },
        leave: { transform: "translateY(800vh)", opacity: 1 },
        config: { mass: 1, tension: 320, friction: 32 },
      }}
    />
  );
};

export default LeaseLightbox;

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const CustomHeader = ({
  currentImageIndex,
  imageCount,
  setOpen,
}: {
  currentImageIndex: number;
  imageCount: number;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingY: "30px", // see .lightbox-image-pager in global.css
      }}
    >
      <Typography
        sx={{
          color: "#ffffff",
          fontFamily: "sans-serif",
          fontSize: "1.1rem",
          fontWeight: 300,
        }}
      >
        {currentImageIndex + 1} / {imageCount}
      </Typography>
      <Button
        onClick={() => setOpen(false)}
        sx={{
          backgroundColor: "#ffffff",
          color: "#000000",
          border: "none",
          "&:hover": { backgroundColor: "#ffffff" },
        }}
      >
        Fermer
      </Button>
    </Box>
  );
};

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const CustomLeftArrowButton = ({
  show,
  gotoPrevious,
}: {
  show: boolean;
  gotoPrevious: () => void;
}) => {
  if (!show) return null;
  return (
    <Box onClick={gotoPrevious} sx={{ cursor: "pointer", zIndex: 1001 }}>
      <ArrowBackIosIcon sx={{ color: "#ffffff", fontSize: "2.4rem" }} />
    </Box>
  );
};

/* -------------------------------------------------------------------------- */
/*                               REACT COMPONENT                              */
/* -------------------------------------------------------------------------- */
const CustomRightArrowButton = ({
  show,
  gotoNext,
}: {
  show: boolean;
  gotoNext: () => void;
}) => {
  if (!show) return null;
  return (
    <Box onClick={gotoNext} sx={{ cursor: "pointer", zIndex: 1001 }}>
      <ArrowForwardIosIcon sx={{ color: "#ffffff", fontSize: "2.4rem" }} />
    </Box>
  );
};
