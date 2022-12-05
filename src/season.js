function Season(Props){
  
    return <div>
            {Props.data._embedded.episodes.map((ele) => {
                {
                    if (Props.seasonnum == ele.season) {
                        return <div>
                            <ul type="none">
                                <li><img src={ele.image.medium}></img></li>
                                <span>{ele.number}</span>{"."}&nbsp;
                                <span><a href={ele.url}>{ele.name}</a></span> &nbsp;&nbsp;&nbsp;&nbsp;
                                <span>{ele.runtime}</span>{"min"}
                                <div dangerouslySetInnerHTML={{__html: ele.summary}} ></div>
                            </ul>
                        </div>
                    }
                    // else{  return <div>
                    //     <ul type="none">
                    //         <li><img src={ele.image.medium}></img></li>
                    //         <span>{ele.number}</span>{"."}&nbsp;
                    //         <span><a href={ele.url}>{ele.name}</a></span> &nbsp;&nbsp;&nbsp;&nbsp;
                    //         <span>{ele.runtime}</span>{"min"}
                    //         <div dangerouslySetInnerHTML={{__html: ele.summary}} ></div>
                    //     </ul>
                    // </div>}
                    
                }
            }
            )
            }
            <br></br>

        </div>}
  



export  {Season}
