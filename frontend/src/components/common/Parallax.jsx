import React from "react"
import { Container } from "react-bootstrap"
import '../../index.css'

const Parallax = () => {
	return (
		<div className="parallax mb-5">
			<Container className="text-start justify-content-center">
				<div className="animated-texts bounceIn">
					<h1>
						Find yourself a friend who will <br/> love you unconditionally, <br/>at <span className="pet-color">Re-Paw-Sitory</span>
					</h1>
					<br/>
					<h3>Help find a permanent home <br/> for these munchkins &lt;3</h3>
				</div>
			</Container>
		</div>
	)
}

export default Parallax