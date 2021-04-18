import React from "react"
import Breadcrumb from "../../components/Common/Breadcrumb"
import BookBlog from "./BookLists"

const BookList = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Breadcrumb breadcrumbItem="Номын жагсаалт" title="Ном" />
        <BookBlog />
      </div>
    </React.Fragment>
  )
}

export default BookList
