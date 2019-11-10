import React, { useState, useCallback } from 'react';
import CssBaseLine from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Grow from '@material-ui/core/Grow';
import QuestionForm from './QuestionForm';
import questions from '../data/questions';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import emailjs from 'emailjs-com';

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
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center'
  },
  button: {
    margin: theme.spacing(2)
  }
}));

const greetingTexts = [
  '인증되었습니다.',
  '안녕하세요 미아님 😄',
  '미아님께 드릴 선물이 있습니다. 받으시겠어요?'
];

const wait = async ms => new Promise(resolve => setTimeout(resolve, ms));

const GiftSystem = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [greetingText, setGreetingText] = useState(greetingTexts[0]);
  const [activeText, setActiveText] = useState(false);
  const [fadeText, setFadeText] = useState(true);
  const [activeButton, setActiveButton] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [delivery, setDelivery] = useState(false);

  const onNext = useCallback(() => setActiveStep(activeStep + 1), [activeStep]);

  const onYesClick = () => {
    emailjs.send(
      'gmail',
      'template_mI5S1cXF',
      {},
      'user_TtZD6CDqaQLRnaDYuChjw'
    );
    setDelivery(true);
  };
  const onNoClick = () => {
    setSnackbarOpen(true);
  };

  if (activeStep === questions.length && !activeText) {
    setActiveText(true);

    wait(1500)
      .then(() => {
        setFadeText(false);
        return wait(1500);
      })
      .then(() => {
        setGreetingText(greetingTexts[1]);
        setFadeText(true);
        return wait(1500);
      })
      .then(() => {
        setFadeText(false);
        return wait(1500);
      })
      .then(() => {
        setGreetingText(greetingTexts[2]);
        setFadeText(true);
        return wait(1500);
      })
      .then(() => setActiveButton(true));
  }

  return (
    <>
      <CssBaseLine />

      <main className={classes.layout}>
        <Paper className={classes.paper}>
          {delivery ? (
            <Grow in timeou={1000}>
              <Typography variant="h2">
                곧 택배가 도착할 예정입니다. 조금만 기다려 주세요. 🙇‍♂️
              </Typography>
            </Grow>
          ) : activeStep < questions.length ? (
            <>
              <Typography variant="h5" align="center">
                권한 확인
              </Typography>
              <Stepper className={classes.stepper} activeStep={activeStep}>
                {questions.map((question, i) => (
                  <Step key={i}>
                    <StepLabel />
                  </Step>
                ))}
              </Stepper>
              <QuestionForm
                question={questions[activeStep].question}
                answer={questions[activeStep].answer}
                onNext={onNext}
              />
            </>
          ) : (
            <>
              <Grow in={fadeText} timeout={{ enter: 1000, exit: 500 }}>
                <Typography variant="h2">{greetingText}</Typography>
              </Grow>

              {activeButton ? (
                <div className={classes.buttons}>
                  <Grow in={activeButton} timeout={1000}>
                    <Button
                      className={classes.button}
                      variant="contained"
                      color="primary"
                      size="large"
                      onClick={onYesClick}
                    >
                      YES
                    </Button>
                  </Grow>
                  <Grow in={activeButton} timeout={1000}>
                    <Button
                      className={classes.button}
                      variant="contained"
                      color="secondary"
                      size="large"
                      onClick={onNoClick}
                    >
                      NO
                    </Button>
                  </Grow>
                </div>
              ) : (
                ''
              )}
            </>
          )}

          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={snackbarOpen}
            autoHideDuration={2000}
            onClose={() => setSnackbarOpen(false)}
            message="다시 한번 생각해보세요."
          />
        </Paper>
      </main>
    </>
  );
};

export default GiftSystem;
