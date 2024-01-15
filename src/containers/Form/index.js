import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 800); })

const Form = ({ onSuccess, onError }) => {
  const [buttonText, setButtonText] = useState("Envoyer");
  const [sending, setSending] = useState(false);
  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      if (sending) {
        return;
      }
      setSending(true);
      setButtonText("En cours");
      // We try to call mockContactApi
      try {
        await mockContactApi();
        setTimeout(() => {
          setSending(false);
          setButtonText("Envoyer");
          onSuccess(true);
        }, 100);
      } catch (err) {
        setSending(false);
        onError(err);
        setButtonText("Envoyer");
      }
    },
    [sending,onSuccess, onError]
  );
  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field placeholder="" label="Nom" />
          <Field placeholder="" label="Prénom" />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={() => null}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
          />
          <Field placeholder="" label="Email" type={FIELD_TYPES.EMAIL}/>
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
          {buttonText}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
}

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
}

export default Form;
