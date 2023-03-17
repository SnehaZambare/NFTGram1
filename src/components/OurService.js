import React from 'react'
import '../service.css';
function OurService(props) {
  return (
    <>
    <div className="product-section mt-150 mb-130">
		<div className="container">
				<div className=" text-center mt-2">
				<div class="alert alert-success" role="alert">
						{props.p} 
				</div>
					
			</div>
		</div>
	</div>
	
    </>
  )
}

export default OurService