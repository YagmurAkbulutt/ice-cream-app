import { useState } from "react"


const Form = () => {
    const [isChecked, setIsChecked] = useState(false)
    const [isHover, setIsHover] = useState(false)

  return (
    <form className="mb-5 d-flex justify-content-center align-items-center gap-3">
      <input onChange={(e) => setIsChecked(e.target.checked)} className="form-check-input" id="terms" type="checkbox" />

      <div className="terms-wrapper">
        <p style={{visibility: isHover ? "visible" : "hidden"}}>Sizin için sipariş oluşturamıyoruz.</p>
      <label htmlFor="terms">Koşulları okudum, kabul ediyorum.</label>
      </div>
      <button onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} disabled={!isChecked} className="btn btn-primary">Siparişi Onayla</button>
    </form>
  )
}

export default Form
