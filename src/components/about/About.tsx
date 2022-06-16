// displays what the game is about
// this game is similar to bingo, a user inputs numbers into their grid, and rolls the dice
// if the number is in the grid, the number will highlight in green
// if the user gets a row, column or diagonal of highlighted numbers, they will win

import React, { Accordion, Col, Container, Row } from 'react-bootstrap';

const About = () => {
  return (
    <>
      <Container fluid className='about-container'>
        <Row>
          <Col>
            <Accordion defaultActiveKey='0'>
              <Accordion.Item eventKey='0'>
                <Accordion.Header>About</Accordion.Header>
                <Accordion.Body>
                  <p>
                    This game is similar to bingo, a user inputs numbers into
                    their grid, and rolls the dice. If the number is in the
                    grid, the number will highlight in green. If the user gets a
                    row, column or diagonal of highlighted numbers, they will
                    win.
                  </p>

                  <p>
                    This game was created by{' '}
                    <a href='https://www.github.com/paulatkins88'>
                      Paul Atkins
                    </a>
                  </p>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default About;
