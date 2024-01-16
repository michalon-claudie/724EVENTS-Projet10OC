import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });

});


describe("When a page is created", () => {
  it("a list of events is displayed", () => {
    render(<Home />);
    const eventsTitles = screen.queryAllByText(/Nos réalisations/i);
    expect(eventsTitles.length).toBeGreaterThan(0);
    eventsTitles.forEach(title => {
    expect(title).toBeInTheDocument()})
  })
  it("a list a people is displayed", () => {
    render(
      <section className="PeoplesContainer">
        <h2 className="Title">Notre équipe</h2>
        <p>Une équipe d’experts dédiés à l’organisation de vos événements</p>
      </section>
    );
    expect(screen.getByText('Notre équipe')).toBeInTheDocument();
    expect(screen.getByText('Une équipe d’experts dédiés à l’organisation de vos événements')).toBeInTheDocument();
})
  })
  describe("a footer is displayed",() => {
    it("an event card, with the last event, is displayed", () => {
    })
    it('renders "Contactez-nous" section', () => {
      render (<Home/>)
      expect(screen.getByText('Contactez-nous')).toBeInTheDocument();
      expect(screen.getByText('45 avenue de la République, 75000 Paris')).toBeInTheDocument();
      expect(screen.getByText('01 23 45 67 89')).toBeInTheDocument();
      expect(screen.getByText('contact@77events.com')).toBeInTheDocument();
  
      const socialLinksDiv = screen.getByTestId('socialLink');
      const socialLinks = socialLinksDiv.querySelectorAll('a');
      expect(socialLinks).toHaveLength(4);
  })
})
  

