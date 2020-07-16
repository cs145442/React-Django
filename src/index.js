import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Cookies from 'js-cookie'
import 'typeface-roboto';
import { Container } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Input } from '@material-ui/core';
import { Card } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import { CardActions } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';



// class FileUploadForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {upload_status: ''};
//     this.handleSubmit = this.handleSubmit.bind(this);
//     this.fileInput = React.createRef();
//   }


//   handleSubmit(event){
//     event.preventDefault();
//     console.log(this.fileInput.current.files[0])
//     const formData = new FormData();
//     formData.append('file', this.fileInput.current.files[0]);
//     const requestOptions = {
//       method: 'POST',
//       headers: {
//         // 'Content-Type': 'multipart/form-data',
//         'X-CSRFToken': Cookies.get('cstoken')
//       },
//       credentials: 'include',
//       body: formData
//     };
//     fetch('http://localhost/extract8/file-upload', requestOptions)
//       .then(response => response.json())
//       .then(
//         (data) => {
//           this.setState({
//             upload_status: true
//           });
//           console.log(data);
//         },
//         (error) => {
//           this.setState({
//             upload_status: false
//           });
//           console.log(error);
//         }
//       );
//   }

//   render() {
//     return (
//     <Container maxWidth="sm">
//       <Grid container spacing={3}>
//         <Grid item xs={12}>
//           <Card>
//             <form onSubmit={this.handleSubmit}>
//             <CardContent>
//               <Typography gutterBottom variant="h5" component="h2">
//                 Upload File
//               </Typography>
//               <input type="file" ref={this.fileInput} />
//             </CardContent>
//             <CardActions>
//               <Button type="submit" size="small" color="primary">
//                 Submit
//               </Button>
//             </CardActions>
//         </form>
//           </Card>
//         </Grid>
//       </Grid>
//       </Container>
//     );
//   }
// }



ReactDOM.render(
    // <FileUploadForm />,
  // <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
