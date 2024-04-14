import React from "react"
import { Container } from "react-bootstrap"
import '../../index.css'

const Parallax = () => {
	return (
		<div className="parallax mb-5">
			<Container className="text-center px-5 py-5 justify-content-center">
				<div className="animated-texts bounceIn">
					<h1>
						Find yourself a friend who will love you unconditionally, at <span className="pet-color">Re-Paw-Sitory</span>
					</h1>
					<h3>Help find a permanent home for these munchkins &lt;3</h3>
				</div>
			</Container>
		</div>
	)
}

export default Parallax