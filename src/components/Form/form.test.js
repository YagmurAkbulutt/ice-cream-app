import { fireEvent, render, screen } from "@testing-library/react"
import Form from "."

test("Koşulların onaylanmasına göre buton aktifliği", () => {
    // 1- test edilecek olan bileşenin render edilmesi
    render(<Form/>)

    // 2- gerekli elemanları çağır (button, checkbox)
    const button = screen.getByRole("button")
    const checkbox = screen.getByRole("checkbox")

    // 3- checkbox tiklenmemiştir
    expect(checkbox).not.toBeChecked()

    // 4- button inaktif mi 
    expect(button).toBeDisabled();

    // 5- checkbox ı tikle
    fireEvent.click(checkbox)

    // 6- button aktif mi 
    expect(button).toBeEnabled()

    // 7- checkboxtan tiki kaldır
    fireEvent.click(checkbox)

    // 8- buton inaktiftir
    expect(button).toBeDisabled()

})

test("butonun hover durumuna göre bildirim gözükür", () => {
    // 1- formu renderla
    render(<Form/>)

    // 2- gerekli elemanları al
    const button = screen.getByRole("button")
    const checkbox = screen.getByRole("checkbox")
    const alert = screen.getByText(/sizin için/i)

    // 3- checkboxı tikle
    fireEvent.click(checkbox)

    // 4- ekranda bildirim yok mu kontrol et 
    expect(alert).not.toBeVisible()

    // 5- mouseu buton üzerine getir
    fireEvent.mouseEnter(button)

    // 6- ekranda bildirim var mı kontrol et
    expect(alert).toBeVisible()

    // 7- mouseu butondan çek
    fireEvent.mouseLeave(button)

    // 8- bildirim ekranda yok mu kontrol et
    expect(alert).not.toBeVisible()
})