import { TextField } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const FTextField = withStyles({
  root: {
    '& .MuiInput-underline:after': {
      // Solid orange underline on focus instead of purple.
      // TODO Can unfortunately not refer to $primary here, need to fix this.
      borderBottomColor: '#ff642b', 
    },
  }
})(TextField)

export default FTextField;