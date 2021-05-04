import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import Breadcrumb from "../../components/Common/Breadcrumb"
import { Alert } from "reactstrap"

import BookDetail from "./BookDetail"

require("dotenv").config()

const demoData = [
  {
    user: {
      id: 1,
      user_fullname: "Bolortoli",
      user_pic_url: "/uploads/bo_80b2972155.jpg",
      user_mail: "admin@admin.com",
      user_joined_date: "2021-03-20T05:00:57.022Z",
      user_phone: "99000000",
    },
    user_books: [
      {
        id: 1,
        book_pic_url: "/uploads/s_mtej_b_daryn_chuluu_6f8656a50b.png",
        book_comments: [
          {
            id: 1,
            name: "Mugii",
            comment: "kdsksl",
          },
          {
            id: 2,
            name: "Heheh",
            comment: "jlkfsd gfd gfdg dfhgfdhfjh jkfhsdjkh djkfhdghfjsdfkgjshg",
          },
        ],
        book_name: "Сүмтэй бударын чулуу",
        book_author: {
          id: 1,
          name: "Бямбын Ринчен",
          description:
            "Еншөөбү овогт Бямбын Ринчен (1905.11.21—1977.03.04) Монголын орчин үеийн утга зохиолыг үндэслэгчдийн нэг, XX зууны манлай монголч эрдэмтэн байв. Англи, франц, герман, чех, польш, эсперанто, орос хэлийг гаргууд эзэмшсэн бөгөөд эсперанто хэлний өөрөө сурах бичиг зохиосон.\n\nТэрээр тухайн үеийнхээ БНМАУ болон ЗХУ-ын төрийн тэргүүнүүдэд өөрийг нь гүтгэн доромжилсныг эсэргүүцэж, мөн нийгэмд байгаа гажуудлын талаар захидал бичин цаг үеэ шүүмжилж байв. Монголын шинжлэх ухааны зүтгэлтэн, зохиолч, орчуулагч, соён гэгээрүүлэгч. 1961 онд БНМАУ-ын ШУА-ийн жинхэнэ гишүүн, академичаар сонгогдсон.\n",
          profile_pic: "/uploads/renchin_97b496e510.jpeg",
        },
        book_added_date: "2021-03-30T16:23:25.868Z",
        has_sale: false,
        has_mp3: true,
        has_pdf: true,
        book_desc:
          "СvмтэйбударынчулууШYЛЭГТУГТугийнтухайшvлэгнамайгбичлээгэжТунолонхvнгайхажмагадгvйУужимталындураараашvлэгчУлаантугхоёрсэтгэлдньхамтбагтахгvйбайжмагадгvйГэвчбитуггvйгээрамьдрахгvйГэгээн vнэнийтулдтуггvйгээртэмцээгvйЭнэулаантугийндорсаясаяараажагссанЭгэлтvмнийижилэгэлардбайна.  ГаднаасньхараадюмбvхнийгдvгнэгчдэдГартаатугбариадхэзээчбихарагдаагvйТалбайдээрихжагсаалындэргэдТашаатулаадзогсожбайсанбайхЄвлийнпальтоныэнгэрзадгайтавиадЄндєргогольмалгайхазгайдараадСахлаазасаждухаараахарсанхvнСавхинбээлийтэйдувдуугайявсанбайх.  ГэвчбиємссєнхувцасшигээнбишГэроронєссєннутагшигээнЭглийнэгэлхvнхvнийлижилхvнЭхоронтойардтvмэнтэйиргэн.  ГэртээарванзургаанцагийнажилтайГэргийдээхvvхэдшигхайртайАйлдааалагбяруушигномхонАрхиуудагтамхитатдагиймлхvн.  ",
      },
      {
        id: 2,
        book_pic_url: "/uploads/1_032d1f0b00.jpg",
        book_name: "Harumafuji",
        book_author: {
          id: 1,
          name: "Бямбын Ринчен",
          description:
            "Еншөөбү овогт Бямбын Ринчен (1905.11.21—1977.03.04) Монголын орчин үеийн утга зохиолыг үндэслэгчдийн нэг, XX зууны манлай монголч эрдэмтэн байв. Англи, франц, герман, чех, польш, эсперанто, орос хэлийг гаргууд эзэмшсэн бөгөөд эсперанто хэлний өөрөө сурах бичиг зохиосон.\n\nТэрээр тухайн үеийнхээ БНМАУ болон ЗХУ-ын төрийн тэргүүнүүдэд өөрийг нь гүтгэн доромжилсныг эсэргүүцэж, мөн нийгэмд байгаа гажуудлын талаар захидал бичин цаг үеэ шүүмжилж байв. Монголын шинжлэх ухааны зүтгэлтэн, зохиолч, орчуулагч, соён гэгээрүүлэгч. 1961 онд БНМАУ-ын ШУА-ийн жинхэнэ гишүүн, академичаар сонгогдсон.\n",
          profile_pic: "/uploads/renchin_97b496e510.jpeg",
        },
        book_added_date: "2021-04-17T05:53:09.447Z",
        has_sale: true,
        has_mp3: true,
        has_pdf: true,
        book_desc: "Harumafuji",
      },
    ],
  },
]

const BookAuthor = () => {
  const { id } = useParams()
  const [data, set_data] = useState([])

  // Check network
  const [isNetworking, setIsNetworking] = useState(false)

  async function makeGetReq() {
    await axios({
      url: `${process.env.REACT_APP_EXPRESS_BASE_URL}/book-single-by-author/${id}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user_information")).jwt
        }`,
      },
    })
      .then(res => {
        set_data(res.data)
      })
      .catch(err => {
        setIsNetworking(true)
      })
  }

  useEffect(() => {
    makeGetReq()
  }, [])

  return (
    <React.Fragment>
      <div className="page-content">
        {isNetworking ? (
          <Alert color="danger" role="alert">
            Сүлжээ уналаа ! Дахин ачааллна уу ?
          </Alert>
        ) : (
          <React.Fragment>
            <Breadcrumb breadcrumbItem="Ном дэлгэрэнгүй" title="Ном" />
            {data != 0 ? <BookDetail user={data} /> : null}
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  )
}

export default BookAuthor
