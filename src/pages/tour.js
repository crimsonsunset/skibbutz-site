import React from "react"
import Header from "@components/header"
import Footer from "@components/footer"
import SubFooter from "@components/subFooter"

let Tour = () => {

  // todo: clean up and actually use pagetemplate component
  return (
    <>
      <Header />
      <main>
        <div>
          <iframe
            src="https://www.google.com/maps/d/u/1/embed?mid=1g1Ui3rmjkVyUjY6vUDfAjI0dQNcQwoG5"
            frameborder="0"
            allowfullscreen
          >
          </iframe>
        </div>

      </main>
      <Footer/>
      <SubFooter title={'title'}/>
    </>
  )
}

export default Tour
