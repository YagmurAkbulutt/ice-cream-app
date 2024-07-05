// prop olarak veriyi alan bir bileşeni test ediyorsak bileşenin aldığı propları göndermemiz gerekir

import { render, screen } from "@testing-library/react"
import Card from "."
import userEvent from "@testing-library/user-event"

const item = {"name": "Vanilla",
    "imagePath": "/images/vanilla.png",
    "id": "4f63"};

test("Miktar, başlık ve fotoğraf gelen propa göre ekrana basılır", ()=>  {
    render(<Card item={item} amount={5} addToBasket={() => {}} clearFromBasket={() => {}}/>)

    //miktar spanını çağır
    const amount = screen.getByTestId("amount")

    //miktaar spanı 5 mi
    expect(amount.textContent).toBe("5")

    //vanilla yazısı ekrana geldi mi
    //getby elementi bulamazsa hata fırlatır yani sadece eleman ekranda mı kontrolünü getby ile yapmak yeterlidir. eleman ekrandaysa getby onu alır test devam eder ekranda yoksa bulamaz test iptal olur. ekrnda mı testi için ekstradan expect yapmaya gerek yok
    screen.getByText("Vanilla")

    // resmi çağır
    const img = screen.getByAltText("çeşit-resim")

    // resmin kaynağı doğru mu
    expect(img).toHaveAttribute("src" , "/images/vanilla.png")
})

test("Butonlara tıklanınca fonksiyonlar doğru parametrelerle çağrılır" , async () => {
    const user = userEvent.setup()

    // prop olarak scoops bileşeninden gönderilen orijinal fonk gönderemeyeceğimizden yapmamız gereken test fonk çağrıldı mı ve doğru parametreler gönderildi mi testleri olacak. mock işlevini kullanırız. sahte ve test edilebilir fonksiyonlardır mock
    const addMockFn = jest.fn()
    const clearMockFn = jest.fn()

    render(<Card item={item} amount={3} addToBasket={addMockFn} clearFromBasket={clearMockFn} />)

    // butonları al
    const addBtn = screen.getByRole("button" , {name: /ekle/i})
    const clearBtn = screen.getByRole("button" , {name: /sıfırla/i})

    // ekle butonuna tıkla
    await user.click(addBtn);

    // addtobasket methodu doğru parametrelerde çağrıldı mı
    expect(addMockFn).toHaveBeenCalledWith(item)

    // sıfırla butonuna tıkla
    await user.click(clearBtn)

    // clearfrombasket methodu doğru parametrelerde çağrıldı mı
    expect(clearMockFn).toHaveBeenCalledWith(item.id)
})