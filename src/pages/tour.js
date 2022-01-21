import React, { useEffect, useState } from "react"
import Header from "@components/header"
import Footer from "@components/footer"
import SubFooter from "@components/subFooter"
import { navigate, useLocation } from "@reach/router"
import { parse } from "query-string"
import { Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from "reactstrap"

let Tour = () => {

  // todo: clean up and actually use pagetemplate component

  const location = useLocation()
  const searchParams = parse(location.search)
  let [currTab] = Object.keys(searchParams)
  currTab = (currTab) ? currTab : 'map'


  useEffect(() => {
    navigate(`/tour?${currTab}`)
  }, [])


  const [activeTab, setActiveTab] = useState(currTab);

  const tabs = {
    "map": {
      title: "Route Map",
      content: (
        <Row className="p-2">
          <Col sm="12" className="p-2">
            <iframe src="https://maps.roadtrippers.com/embedded/trips/35390825"
                    frameBorder="0"
                    allowFullScreen
            >

            </iframe>
          </Col>
        </Row>
      )
    },
    "calendar": {
      title: "Tour Stops",
      content: (
        <Row className="p-2">
          <Col sm="12" className="p-2">
            <iframe
              src="https://calendar.google.com/calendar/embed?src=qu95g2ce3bbrncasqf832au7no%40group.calendar.google.com&ctz=America%2FNew_York"
              frameBorder="0"
              scrolling="no"
              allowFullScreen
            >

            </iframe>

          </Col>
        </Row>
      )
    },
    "groupies": {
      title: "Groupie Schedule",
      content: (
        <Row className="p-2">
          <Col sm="12" className="p-2">
            <h4 className="text-success">Coming Soon!</h4>
          </Col>
        </Row>
      )
    }
  }


  const onTabClicked = tab => {
    if (activeTab !== tab) setActiveTab(tab);
    navigate(`/tour?${tab}`)
  }

  return (
    <>
      <Header />
      <main>
        <div className="row">
          <div className="col-lg-12">
            <Nav tabs>
              {
                Object.entries(tabs).map((tab) => (
                  <NavItem key={tab[0]}>
                    <NavLink
                      className={activeTab === tab[0] ? "active" : ""}
                      onClick={() => {
                        onTabClicked(tab[0]);
                      }}
                      role="button"
                    >
                      {tab[1].title}
                    </NavLink>
                  </NavItem>
                ))
              }
            </Nav>

            <TabContent activeTab={activeTab}>
              {
                Object.entries(tabs).map((tab) => (
                  <TabPane key={tab[0]} tabId={tab[0]}>
                    {tab[1].content}
                  </TabPane>
                ))
              }
            </TabContent>
          </div>
        </div>
      </main>
      <Footer />
      <SubFooter title={"title"} />
    </>
  )
}


export default Tour


// <iframe
//   src="https://www.google.com/maps/d/u/1/embed?mid=1g1Ui3rmjkVyUjY6vUDfAjI0dQNcQwoG5"
//   frameBorder="0"
//   allowFullScreen
// >
// </iframe>

