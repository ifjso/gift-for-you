import React, { useState, useCallback } from 'react';
import CssBaseLine from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import QuestionForm from './QuestionForm';
import questions from '../data/questions';

const useStyles = makeStyles(theme => ({
  layout: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2)
  },
  stepper: {
    padding: theme.spacing(3, 0, 5)
  }
}));

const GiftSystem = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const currentQuestion = questions[activeStep];

  const onConfirm = useCallback(
    isCorrect => {
      if (isCorrect) {
        setActiveStep(activeStep + 1);
      }
    },
    [activeStep]
  );

  return (
    <>
      <CssBaseLine />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Stepper className={classes.stepper} activeStep={activeStep}>
            {questions.map((question, i) => (
              <Step key={i}>
                <StepLabel />
              </Step>
            ))}
          </Stepper>
          <QuestionForm
            question={currentQuestion.question}
            answer={currentQuestion.answer}
            onConfirm={onConfirm}
          />
        </Paper>
      </main>
    </>
  );
};

export default GiftSystem;
