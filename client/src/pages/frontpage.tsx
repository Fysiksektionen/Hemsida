import placeholder from '../placeholder.jpg'
import React from 'react';
import ProfileCard from '../components/profile-card'

function Frontpage() {
  return (
      <div>
        <div className="">
            <img src={placeholder} className={"img-fluid"} style={{ marginTop: "50px"}}></img>
        </div>

          <div className={"profile-cards container"}>
              <div className={"row"}>
                  <div className={"col-sm"}>
                      <ProfileCard image_url="./Christoffer.png" role="Ordförande" year_code="F-17" name="Christoffer Ejemyr" email="ordf@kth.se" description="Leder styret osv mera text. text text text text. Fast inte för långt"/>
                  </div>
                  <div className={"col-sm"}>
                      <ProfileCard image_url="./Christoffer.png" role="Ordförande" year_code="F-17" name="Christoffer Ejemyr" email="ordf@kth.se" description="Leder styret osv mera text. text text text text. Fast inte för långt"/>
                  </div>
              </div>
          </div>

      </div>
  )
}

export default Frontpage;
