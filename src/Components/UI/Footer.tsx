import { Col, Row } from "react-bootstrap";

export default function Footer() {
  return (
    <footer className="page-footer font-small blue pt-2 Footer">
      <div className="container-fluid text-center text-md-left"></div>
      <Row>
        <Col className="text-centre py-3">Cigno © Copyright 2024</Col>
      </Row>
    </footer>
  );
}
