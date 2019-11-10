import React, { useState, useCallback, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  button: {
    marginTop: theme.spacing(2)
  }
}));

const QuestionForm = ({ question, answer, onNext }) => {
  const classes = useStyles();
  const [value, setValue] = useState('');
  const textField = useRef(null);

  const onChange = useCallback(e => setValue(e.target.value), []);
  const onClick = useCallback(() => {
    if (value.trim() === answer) {
      setValue('');
      textField.current.focus();
      onNext();
    }
  }, [answer, onNext, value]);

  return (
    <>
      <Typography variant="h2" align="center">
        {question}
      </Typography>
      <Grid container>
        <Grid item xs={12}>
          <TextField
            required
            autoFocus
            fullWidth
            label="답변"
            margin="normal"
            inputRef={textField}
            value={value}
            onChange={onChange}
          />
        </Grid>
      </Grid>
      <div className={classes.buttons}>
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={onClick}
        >
          확인
        </Button>
      </div>
    </>
  );
};

export default QuestionForm;
