import { getByTestId, render, screen } from "@testing-library/react"
import Toppings from "."
import userEvent from "@testing-library/user-event"

test("sosları ekleme ve çıkarma işleminin toplam fiyata etkisi",
    async () => {
        const user = userEvent.setup()

        render(<Toppings/>)

        // bütün checkboxları al
        const toppings = await screen.findAllByRole("checkbox")

        // toplam ücreti al
        const total = screen.getByTestId("total")

        // tüm checkboxlar tiksiz mi
        toppings.forEach((i) => expect(i).not.toBeChecked())

        // toplam ücret 0 mı 
        expect(total.textContent).toBe("0")

        // checkboxlardan birini tikle
        await user.click(toppings[0])

        // toplam fiyat 3 mü
        expect(total.textContent).toBe("3")

        // checkboxlardan bir tane daha ekle
        await user.click(toppings[4])

        // toplam fiyat 6 mı
        expect(total.textContent).toBe("6")

        // ilk tiklenen elemanı kaldır
        await user.click(toppings[0])

        // toplam fiyat 3 mü
        expect(total.textContent).toBe("3")

        // ikinci tikleneni kaldır
        await user.click(toppings[4])

        // toplam fiyat 0 mı
        expect(total.textContent).toBe("0")
    }
)