
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
function Currentseason(Props) {
    return <div> {Props.seasonnum.map((ele) => {


        return <Grid container direction="row" justifyContent="center" alignItems="start"  >

            <Grid item md={3}><a href={ele.url}><img src={ele.image.medium}  width={250} ></img></a></Grid>
            <Grid item md={8} container direction="column" height={140} justifyContent="right" alignItems="right" style={{backgroundColor: "rgb(24, 23, 23)"}}>
                <div><span >S{ele.season}</span>{"."}&nbsp;
                    <span >E{ele.number}</span>{"."}&nbsp;
                    <span>{ele.name}</span> &nbsp;
                    <span>{ele.runtime}</span>{"min"}<br />
                </div>
                <div dangerouslySetInnerHTML={{ __html: ele.summary }} class="para" ></div>

            </Grid>

        </Grid>





    })}   </div>
}
export default Currentseason