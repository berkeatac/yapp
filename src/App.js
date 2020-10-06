import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import AddIcon from "@material-ui/icons/Add";

import {
  createMuiTheme,
  ThemeProvider,
  Container,
  TextField,
  Grid,
  IconButton,
} from "@material-ui/core";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import CommentIcon from "@material-ui/icons/Comment";

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
  const [todos, setTodos] = useState([]);

  return (
    <ThemeProvider theme={darkTheme}>
      <Paper style={{ minHeight: "100vh" }}>
        <Container>
          <Grid container style={{ paddingTop: "20px" }}>
            <Grid container item xs={12} align="center" justify="center">
              <Grid item xs={11}>
                <TextField
                  placeholder="New task"
                  style={{ width: "100%" }}
                  color="secondary"
                  onChange={(e) => setNewTask(e.target.value)}
                  value={newTask}
                />
              </Grid>
              <Grid item xs={1}>
                <IconButton
                  onClick={() => {
                    setTodos([
                      ...todos,
                      { id: Math.random(), task: newTask, done: false },
                    ]);
                    setNewTask("");
                  }}
                >
                  <AddIcon />
                </IconButton>
              </Grid>
            </Grid>
            <Grid container item xs={12} align="center" justify="center">
              {todos.map((todo) => {
                return (
                  <Grid item xs={12}>
                    <ListItem
                      key={todo.id}
                      role={undefined}
                      dense
                      button
                      onClick={() => setTodos([...todos])}
                    >
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          tabIndex={-1}
                          disableRipple
                          checked={todo.done}
                        />
                      </ListItemIcon>
                      <ListItemText primary={`${todo.task}`} />
                    </ListItem>
                  </Grid>
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
