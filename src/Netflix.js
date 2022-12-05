import React from "react";
import { Season } from "./season";
import Currentseason from "./curseason";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import './index.css';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import IconButton from '@mui/material/IconButton';
import { width } from "@mui/system";




class Netflix extends React.Component {
    constructor() {
        super()

        this.state = {
            Data: "",
            Seasoncat: "All",
            seasonno: "",
            episodes: "",
            nameofepi: ""


        }
    }
    componentDidMount() {
        fetch("http://api.tvmaze.com/singlesearch/shows?q=narcos&embed=episodes")
            .then((resp) => resp.json()).then((Data) => {
                this.setState({ Data: Data });
                this.Seasonno(Data._embedded.episodes);
                this.setState({ episodes: Data._embedded.episodes });



            })
    }
    Seasonno = (episodes) => {
        let epi = ["All"]
        for (let ele of episodes) {
            if (epi.includes(ele.season) == false) {
                epi.push(ele.season)
            }
        }
        this.setState({ seasonno: epi })
    }



    s1fun = (e) => {
        this.setState({ Seasoncat: e.target.value })
        if (e.target.value !== "All") {

            let filtereddata = this.state.Data._embedded.episodes.filter((x) => {
                if (x.season == e.target.value) {
                    return true
                }
                else {
                    return false

                }
            })
            this.setState({ episodes: filtereddata })
        }
        else {

            this.setState({ episodes: this.state.Data._embedded.episodes })
        }
    }



    changefn1 = (e) => {
        this.setState({ nameofepi: e.target.value })
        if (this.state.Seasoncat !== "All") {
            let epidata = this.state.Data._embedded.episodes.filter((x) => {
                if (x.name.includes(e.target.value) && x.season == this.state.Seasoncat) {
                    return true
                }
                else {
                    return false

                }
            })
            this.setState({ episodes: epidata })
        }
        else {
            let epidata = this.state.Data._embedded.episodes.filter((x) => {
                if (x.name.includes(e.target.value)) {
                    return true
                }
                else {
                    return false

                }
            })
            this.setState({ episodes: epidata })

        }


    }


    Ascendingclicked = () => {
        let temp = ""
        let updata = this.state.episodes.map((x) => x)
        for (let i = 0; i < updata.length; i++) {
            for (let j = 0; j < updata.length - 1 - i; j++) {
                if (updata[j].name.slice(0, 1) > updata[j + 1].name.slice(0, 1)) {
                    temp = updata[j];
                    updata[j] = updata[j + 1];
                    updata[j + 1] = temp;
                }
            }
        }




        this.setState({ episodes: updata })
    }
    Descendingclicked = () => {
        let temp = ""
        let updata = this.state.episodes.map((x) => x)
        for (let i = 0; i < updata.length; i++) {
            for (let j = 0; j < updata.length - 1 - i; j++) {
                if (updata[j].name.slice(0, 1) < updata[j + 1].name.slice(0, 1)) {
                    temp = updata[j];
                    updata[j] = updata[j + 1];
                    updata[j + 1] = temp;
                }
            }
        }




        this.setState({ episodes: updata })
    }






    render() {
        if (this.state.Data == "") {
            return <h1 style={{ backgroundColor: 'red' }}>Loading narcos data</h1>

        }
        return <div>
            <Grid container spacing={2} margin="10px">
                <Grid item md={6} margin="0" >
                    <h1> {this.state.Data.name}<br></br></h1>
                    <div dangerouslySetInnerHTML={{ __html: this.state.Data.summary }} ></div><br></br>
                    <strong>WebChannel:</strong><a href={this.state.Data.officialSite}>{this.state.Data.webChannel.name}</a><span>{" ("}{this.state.Data.premiered.slice(0, 4)}{" - "}{this.state.Data.ended.slice(0, 4)}</span>{")"}<br></br>
                    <strong> Average Runtime:</strong>{this.state.Data.averageRuntime}<br></br>
                    <strong> Status:</strong>{this.state.Data.status}<br></br>
                    <strong> Genres:</strong>{this.state.Data.genres}<br></br>
                    <strong> Type:</strong>{this.state.Data.type}<br></br>
                    <strong> Language:</strong>{this.state.Data.language}<br></br>
                    <strong> Rating:</strong>{this.state.Data.rating.average}<br></br>
                    <strong> Official Site:</strong><a href={this.state.Data.webChannel.officialSite}>{this.state.Data.webChannel.officialSite}</a><br></br>
                </Grid>
                <br></br>
                <Grid item md={6} >

                    <img src={this.state.Data.image.medium} />
                </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="center" alignItems="center" spacing={2} >
                <Grid item md={1} >
                    <Select onChange={this.s1fun} value={this.state.Seasoncat} 
                        id="demo-simple-select" style={{backgroundColor:"rgba(255,255,255,50%)",borderRadius:"50px"}} >
                        {this.state.seasonno.map((x) => {
                            return <MenuItem color="primary" value={(x)} >Season {x}</MenuItem >

                        })}
                    </Select>
                </Grid>
                <br></br>
                <Grid item md={9}>

                    <TextField  style={{backgroundColor:"rgba(255,255,255,50%)", width:"70%",borderRadius:"50px"}}  variant='outlined' type="text" id="text" onChange={this.changefn1} value={this.state.nameofepi} placeholder="Search Here" />
                </Grid>

                <Grid item md={1}>
                   
                        <IconButton variant="contained" style={{backgroundColor:"rgba(255,255,255,50%)"}} onClick={this.Ascendingclicked} >
                            <ArrowDropUpOutlinedIcon />
                        </IconButton>
                   
                </Grid>
                <Grid item md={1}>
                    
                        <IconButton variant="contained" onClick={this.Descendingclicked} style={{backgroundColor:"rgba(255,255,255,50%)"}}>
                            <ArrowDropDownOutlinedIcon />
                        </IconButton>

                  
                </Grid>
            </Grid>
            <br></br>
            <Currentseason seasonnum={this.state.episodes} />


        </div >
    }
}


export default Netflix
function Genre(props) {
    let col = props.col
    return props.d.map((x, i) => { return <li style={{ color: col }}> {x}</li> });

}

