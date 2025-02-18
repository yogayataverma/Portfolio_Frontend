import React from 'react'

export default function About() {
  return (
    <div>
      <h1 className="fade-in" style={{ margin: "auto", textAlign:"center" , fontSize:"2vw" , color:"#008080"}}>About Me!</h1>
            <br/>
            <h2 className="fade-in" style={{ margin: "auto", textAlign:"center" , fontSize:"1.5vw" , color:"#556B2F"}}>
              <span style={{marginLeft:'0.01em', animation: '1s blink infinite', borderRight: '2px solid black'}}>&nbsp;</span>
            </h2>
            <br/>
            <p className="fade-in" style={{textAlign:"justify" , fontSize:"0.9em" , color:"#556B2F"}}>I am a recent MCA graduate from Thapar University, eager to secure an entry-level software developer position at a tech-driven firm. Motivated and skilled, aiming to apply my knowledge for a meaningful contribution..</p>
            <button className="button button1 fade-in" style={{width:"12em", margin:"1em"}} >Portifolio</button>
            <button className="button button2 fade-in" style={{width:"12em"}}  >Recent Updates</button>
    </div>
  )
}
