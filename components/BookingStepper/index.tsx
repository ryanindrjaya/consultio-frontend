import * as React from 'react';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import CheckIcon from '@mui/icons-material/Check';
import GradeIcon from '@mui/icons-material/Grade';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { StepIconProps } from '@mui/material/StepIcon';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 27,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: '#437EEB',
      height: 14,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: '#437EEB',
      height: 14,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 14,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#fff',
  zIndex: 1,
  border: '5px solid #eaeaf0',
  color: '#eaeaf0 ',
  width: 70,
  height: 70,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundColor: '#437EEB',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    border: '5px solid #437EEB',
  }),
  ...(ownerState.completed && {
    backgroundColor: '#437EEB',
    border: '5px solid #437EEB',
  }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  const icons: { [index: string]: React.ReactElement } = {
    1: <SupportAgentIcon fontSize={'large'}/>,
    2: <EmojiObjectsIcon fontSize={'large'} />,
    3: <CheckIcon fontSize={'large'} />,
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

const steps = ['Konsultan dan Masalahmu', 'Kesimpulan dan Review', 'Selesai'];

export default function CustomizedSteppers({status}: {status: String}) {

  function classifyStatus(status: String) {
    switch (status) {
      case "Active":
        return 0;
      case "Waiting for review":
        return 1;
      case "Completed"                                                      :
        return 2;
      default:
        return 0;
    }
  }

  return (
    <Stack sx={{ width: '100%' }} spacing={4}>
      <Stepper alternativeLabel activeStep={classifyStatus(status)} connector={<ColorlibConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>
              <p className='font-poppins font-bold text-lg'>{label}</p>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Stack>
  );
}
