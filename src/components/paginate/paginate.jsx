import Button from "@mui/material/Button";
import "./paginate.css";
const Paginate = ({ handlePageChange, currentPage, totalPages }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "20px",
        paddingBottom: "20px",
      }}
    >
      <Button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        variant="contained"
        color="warning"
      >
        &larr; Anterior
      </Button>
      {Array.from({ length: totalPages }, (_, index) => (
        <Button
          // variant="text"
          sx={{ margin: "2px", marginLeft: "5px", marginRight: "5px" }}
          key={index + 1}
          onClick={() => handlePageChange(index + 1)}
          variant={currentPage !== index + 1 ? "outlined" : "disabled"}
          color="warning"
        >
          {index + 1}
        </Button>
      ))}

      <Button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        variant="contained"
        color="warning"
      >
        Siguiente &rarr;
      </Button>
    </div>
  );
};

export default Paginate;
