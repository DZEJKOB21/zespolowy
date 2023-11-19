import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import JobOffer from '../objects/JobOffer';
import Candidate from '../objects/Candiate';
import axios from 'axios';
import JobInterview from '../objects/JobInterview';
import InterviewStatus from '../objects/status/InteviewStatus';
import DegreesOfEducation from '../enum/DegreesOfEducation';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props: any) {
  const [open, setOpen] = React.useState(false);
  // const [interview, setInterview] = React.useState<InterviewStatus>(new InterviewStatus("",false));
  const [interview, setInterview] = React.useState<JobInterview>(
    new JobInterview(
      // props.props1.id ? props.props1[0] as Candidate : new Candidate("test", "test", "test" ,"345", DegreesOfEducation.PROFFESIONAL_DEGREE, "test", "test"),
      // props.props2.id ? props.props2 as JobOffer : new JobOffer("test", "test", "test", "test", 455))
      props.props1[0] as Candidate, props.props2 as JobOffer
    ));
  const [isLack, setIsLack] = React.useState(false);

  // props1 - candidate
  // props2 - joboffer

  React.useEffect(() => {
    if (interview != null) {
      const fetchInterview = async () => {
        console.log(props.props1.id)
        await axios.get(`http://localhost:8080/api/interviews/joboffer/${props.props2.id}/candidate/${props.props1.id}`).then(res => {
          if (res.status === 204) {
            console.log("204");
            setIsLack(true);
          }
          else if (res.status === 200) {
            console.log("200");
            setInterview(res.data);
          }
        })
      }
      fetchInterview();
    } else {
      setIsLack(true);
    }
  }, [])

  React.useEffect(() => {
    console.log(interview);
  }, [interview])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // console.log(props.props1[0] as Candidate)
    console.log(props.props2)
  };

  const handleAccept = async () => {
    if (props.props1 != null && props.props2 != null) {
      await axios.post(`http://localhost:8080/api/interviews`, new JobInterview(props.props1 as Candidate, props.props2 as JobOffer)).then(e => {
        window.location.reload();
      })
    }
  }

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button> */}
      {
        props.props3 ?
          !isLack ?
            !interview!.result ?
              < button className='btn btn-secondary'>Oczekiwanie</button>
              :
              < button className='btn btn-info' onClick={handleClickOpen}>Umówiony</button>
            :
            < button className='btn btn-primary' onClick={handleClickOpen}>Umów się</button>
          :
          <></>

      }
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >

        <DialogTitle>
          {
            !interview!.result ?
              "Czy chcesz się umówić na rozmowę kwalifikacyjną?"
              :
              `Zostałeś umówiony! ` + `${interview?.notes}`
          }
        </DialogTitle>
        {/* <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent> */}
        <DialogActions>
          {
            !interview!.result ? <>
              <Button onClick={handleClose}>Nie</Button>
              <Button onClick={handleAccept}>Tak</Button>
            </>
              :
              <Button onClick={handleClose}>OK</Button>
          }
        </DialogActions>
      </Dialog>
    </div >
  );
}