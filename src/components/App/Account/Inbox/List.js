import React from "react";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";

import { makeStyles } from "@material-ui/core/styles";

import IconInboxSelectedPNG from "../../../../assets/images/icon-inbox-selected.png";
import IconInboxCheckPNG from "../../../../assets/images/icon-inbox-check.png";
import i18n from "../../../../utils/i18n"
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#f7f7f7",
    color: "#747474",
    padding: "12px",
    maxWidth: "600px",
  },
  body: {
    fontSize: 14,
    padding: "5px 0 5px 10px",
    maxWidth: "600px",
    color: "#7b7b7b",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    backgroundColor: "#FFFFFF",
    "&:hover": {
      backgroundColor: "#fdeced !important",
      cursor: "pointer",
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  root: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  icon: {
    width: 20,
    height: 20,

    backgroundImage: "url(" + IconInboxCheckPNG + ")",
    backgroundRepeat: "no-repeat",
    "$root.Mui-focusVisible &": {},
    "input:hover ~ &": {},
    "input:disabled ~ &": {},
  },
  checkedIcon: {
    backgroundImage: "url(" + IconInboxSelectedPNG + ")",
    backgroundRepeat: "no-repeat",
    "&:before": {
      display: "block",
      width: 20,
      height: 20,
      backgroundImage: "url(" + IconInboxSelectedPNG + ")",
      backgroundRepeat: "no-repeat",
      content: '""',
    },
    "input:hover ~ &": {},
  },
});
const InnerWrap = styled.div`
  width: 935px;
  float: left;
  margin-top: 18px;
  box-sizing: border-box;
  background-color: #f7f7f7;
  display: contents;
`;
function List(props) {


  const handleChangePage = (event, newPage) => {
    props.onhandleChangePage(newPage + 1);
  };

  const isSelected = (id) => props.selected.indexOf(id) !== -1;

  return (
    <InnerWrap>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>{i18n.t("inbox.dateTime")}</StyledTableCell>
            <StyledTableCell>{i18n.t("inbox.type")}</StyledTableCell>
            <StyledTableCell>{i18n.t("inbox.inboxTitle")}</StyledTableCell>
            <StyledTableCell>{i18n.t("inbox.details")}</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row, index) => {
            const isItemSelected = isSelected(row.id);
            const labelId = `enhanced-table-checkbox-${index}`;

            return (
              <StyledTableRow
                hover
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={row.id}
                selected={isItemSelected}
              >
                <StyledTableCell
                  style={
                    row.status === 1
                      ? { fontWeight: "bold" }
                      : { fontWeight: "normal" }
                  }
                >
                  {row.create_time_text}
                </StyledTableCell>
                <StyledTableCell
                  id={labelId}
                  style={
                    row.status === 1
                      ? { fontWeight: "bold" }
                      : { fontWeight: "normal" }
                  }
                >
                  {row.business_type_text}
                </StyledTableCell>
                <StyledTableCell
                  style={
                    row.status === 1
                      ? { fontWeight: "bold" }
                      : { fontWeight: "normal" }
                  }
                >
                  {row.title_text}
                </StyledTableCell>
                <StyledTableCell
                  style={
                    row.status === 1
                      ? { fontWeight: "bold" }
                      : { fontWeight: "normal" }
                  }
                >
                  {(() => {
                    var arr = [];
                    Object.keys(row.content_text).forEach((key) => {
                      arr.push({
                        label: key,
                        value: row.content_text[key],
                      });
                    });
                    return arr.map((item) => {
                      return (
                        <div>
                          {item.label}: {item.value}
                        </div>
                      );
                    });
                  })()}
                </StyledTableCell>
              </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10]}
        component="div"
        count={props.total}
        rowsPerPage={10}
        page={props.page}
        labelRowsPerPage={("asd", "213123", "asdasdasda", "每頁行数")}
        backIconButtonProps={{
          "aria-label": "previous page",
        }}
        nextIconButtonProps={{
          "aria-label": "next page",
        }}
        onChangePage={handleChangePage}
      />
    </InnerWrap>
  );
}
export default List;
