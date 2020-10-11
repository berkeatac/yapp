import React, { useState, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import AddIcon from "@material-ui/icons/Add";
import _ from "lodash";

import {
  createMuiTheme,
  ThemeProvider,
  Container,
  TextField,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import CommentIcon from "@material-ui/icons/Comment";

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import { useSyncedLocalStorage } from "use-synced-local-storage";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  closeButton: {
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
  },
});

const { app } = window.require("electron").remote;

const App = () => {
  const classes = useStyles();
  const [newTask, setNewTask] = useState("");
  const [todos, setTodos] = useSyncedLocalStorage("yapp_todos", {});
  const inputRef = useRef(null);

  const submitTodo = () => {
    if (newTask) {
      setTodos({
        [Math.random()]: { task: newTask, done: false },
        ...todos,
      });
      setNewTask("");
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Paper style={{ minHeight: "100vh" }}>
        <Container>
          <Grid container style={{ paddingTop: "20px" }}>
            <Grid container item xs={12} align="center" justify="center">
              <Grid item xs={11}>
                <TextField
                  autoFocus
                  ref={inputRef}
                  placeholder="New task"
                  style={{ width: "100%" }}
                  color="secondary"
                  onChange={(e) => setNewTask(e.target.value)}
                  onKeyDown={(e) => (e.keyCode == 13 ? submitTodo() : null)}
                  value={newTask}
                />
              </Grid>
              <Grid item xs={1}>
                <IconButton onClick={() => submitTodo()}>
                  <AddIcon />
                </IconButton>
              </Grid>
            </Grid>
            <Grid
              container
              item
              xs={12}
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              {Object.keys(todos).map((id) => {
                return (
                  <>
                    <Grid item xs={11}>
                      <ListItem
                        key={id}
                        role={undefined}
                        dense
                        button
                        onClick={() =>
                          setTodos({
                            ...todos,
                            [id]: { ...todos[id], done: !todos[id].done },
                          })
                        }
                      >
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            tabIndex={-1}
                            disableRipple
                            checked={todos[id].done}
                          />
                        </ListItemIcon>
                        <Typography
                          style={{
                            textDecoration: `${
                              todos[id].done ? "line-through" : "none"
                            }`,
                          }}
                        >{`${todos[id].task}`}</Typography>
                      </ListItem>
                    </Grid>
                    <Grid
                      item
                      xs={1}
                      style={{ textAlign: "center", padding: "6px" }}
                      onClick={() => setTodos(_.omit(todos, id))}
                      className={classes.closeButton}
                    >
                      X
                    </Grid>
                  </>
                );
              })}
            </Grid>
          </Grid>
        </Container>
      </Paper>
    </ThemeProvider>
  );
};

export default App;
