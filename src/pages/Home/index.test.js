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
  describe("a footer is displayed", () => {
    const socialMediaLinks = screen.getAllByRole('link');
    socialMediaLinks.forEach((link) => {
      expect(link).toBeInTheDocument();
    });
    it("an event card, with the last event, is displayed", () => {
      if (last) {
        const eventCardImage = screen.getByAltText(last.title);
        const eventCardTitle = screen.getByText(last.title);
        const eventCardDate = screen.getByText(new Date(last.date).toLocaleDateString(), { exact: false })
        const eventCardLabel = screen.getByText('boom');

        expect(eventCardImage).toBeInTheDocument();
        expect(eventCardTitle).toBeInTheDocument();
        expect(eventCardDate).toBeInTheDocument();
        expect(eventCardLabel).toBeInTheDocument();
      } 
    })
  })
  

