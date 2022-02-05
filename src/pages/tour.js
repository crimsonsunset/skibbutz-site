import React, { useEffect, useRef, useState } from "react"
import { delay } from "lodash"
import "bootstrap/dist/css/bootstrap.min.css"
import Header from "@components/header"
import Footer from "@components/footer"
import SubFooter from "@components/subFooter"
import { navigate, useLocation } from "@reach/router"
import { Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from "reactstrap"
import { isBrowser, getWindowVariable } from "@util/helpers"

//create your forceUpdate hook
function useForceUpdate() {
  const [value, setValue] = useState(0) // integer state
  return () => setValue(value => value + 1) // update the state to force render
}

let Tour = () => {

  // todo: clean up and actually use pagetemplate component

  const forceUpdate = useForceUpdate()
  const location = useLocation()
  let [hashMark, ...currTab] = location.hash
  currTab = (currTab) ? currTab : "map"

  useEffect(() => {
    console.log("----in mount", currTab, isBrowser())

    delay((e, i) => {
      document.getElementById(`tab-${currTab}`).classList.add("active")
      document.getElementById(`pane-${currTab}`).classList.add("active")
    }, 750)

  }, [])

  const [activeTab, setActiveTab] = useState(currTab)
  console.log("rendering", currTab, activeTab)

  const tabs = {
    "map": {
      title: "Route Map",
      key: "map",
      ref: useRef(null),
      content: (
        <Row className="p-2">
          <Col
            sm="12" className="p-2">
            <iframe
              src="https://maps.roadtrippers.com/embedded/trips/35390825"
              frameBorder="0"
              allowFullScreen
            >
            </iframe>
          </Col>
        </Row>
      ),
    },
    "calendar": {
      title: "Tour Stops",
      key: "calendar",
      ref: useRef(null),
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
      ),
    },
    // embedded editable spreadsheet url is
    // src="https://docs.google.com/spreadsheets/d/1swWvf1KaA-LvaLZXJKLgrEaYyTLp5YHMWC2hocSSv9s/edit?usp=sharing?&amp;rm=minimal&amp;single=true&amp;"
    "groupies": {
      title: "Groupie Schedule",
      key: "groupies",
      ref: useRef(null),
      content: (
        <Row className="p-2">
          <Col sm="12" className="p-2">
            <h3> Click&nbsp;
              <a
                target="_blank"
                href={"https://docs.google.com/spreadsheets/d/1swWvf1KaA-LvaLZXJKLgrEaYyTLp5YHMWC2hocSSv9s"}>Here</a>
              &nbsp;to Edit
            </h3>
            <iframe
              src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRQUUGBUN-ya3MCIgptAjYv_2QXZ5iOuZ3b9B2fVjmyezMq7uiwOeiFgIXjaNvVQSRy-V4I92bRiXRm/pubhtml?gid=0&amp;single=true&amp;widget=true&amp;headers=false"
              frameBorder="0"
              scrolling="no"
              allowFullScreen
            >
            </iframe>

          </Col>
        </Row>
      ),
    },
  }


  const onTabClicked = (tab) => {
    setActiveTab(tab)
    navigate(`/tour#${tab}`)
    forceUpdate()
  }

  return (
    <>
      <Header />
      <main>
        <div className="row">
          <div className="col-lg-12">
            <Nav tabs>
              {
                Object.entries(tabs).map(([key, tab], ind) => {
                  return (
                    <NavItem key={tab.key}>
                      <NavLink
                        id={`tab-${tab.key}`}
                        ref={tabs[tab.key].ref}
                        className={(activeTab === tab.key) ? "active" : ""}
                        onClick={() => {
                          onTabClicked(tab.key)
                        }}
                        role="button"
                      >
                        {tab.title}
                      </NavLink>
                    </NavItem>
                  )
                })
              }
            </Nav>

            <TabContent
              className={"tab-content"}
              activeTab={activeTab}
            >
              {
                Object.entries(tabs).map(([key, tab], ind) => (
                  <TabPane
                    activeTab={activeTab}
                    id={`pane-${tab.key}`}
                    key={tab.key}
                    tabId={tab.key}>
                    {tab.content}
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

