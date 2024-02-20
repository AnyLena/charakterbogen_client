import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/turbofate.css";
import Textarea from "../components/Textarea";

const TurboFate = () => {
  const SERVER = import.meta.env.VITE_DB;

  const [data, setData] = useState("");
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e, index) => {
    e.preventDefault();
    const { name, value, dataset } = e.target;
    const section = dataset.section;

    if (section === "stress") {
      setUserData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [name]: prev[section] ? !prev[section][name] : false,
        },
      }));
    } else if (index === undefined) {
      setUserData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [name]: value,
        },
      }));
    } else {
      setUserData((prev) => {
        const updatedArray = [...prev.stunts];
        updatedArray[index][name] = value;
        return { ...prev, stunts: updatedArray };
      });
    }
  };

  const getCharacters = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${SERVER}/turbo-fate`);
      setData(response.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCharacters();
  }, []);

  const getCharacter = async (id) => {
    try {
      const response = await axios.get(`${SERVER}/turbo-fate/${id}`);
      setUserData(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = async () => {
    try {
      await axios.put(`${SERVER}/turbo-fate`, userData);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCreate = async () => {
    try {
      const response = await axios.post(`${SERVER}/turbo-fate`);
      setUserData(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  // useEffect(() => {
  //   console.log(userData);
  // }, [userData]);

  return (
    <>
      <section className="turbofate">
        <h1>TurboFate</h1>

        {loading ? <div>Loading Data ... </div> : null}
        <div className="wahl-btn-container">
          <p>Charakter wählen:</p>
          <div className="wahl-btn-items">
            {data.length > 0
              ? data.map((char) => (
                  <button
                    key={char._id}
                    id={char._id}
                    onClick={() => getCharacter(char._id)}
                  >
                    {char.allgemeines.name}
                  </button>
                ))
              : null}
          </div>
        </div>

        {Object.keys(userData).length > 0 ? (
          <>
            <div className="grid-container--turbo">
              <div className="grid-item--turbo">
                <h2>Allgemeines</h2>

                <form>
                  <label htmlFor="name">Name</label>
                  <Textarea
                    id="name"
                    name="name"
                    section="allgemeines"
                    value={userData.allgemeines.name}
                    onChange={handleChange}
                  />
                  <label htmlFor="beschreibung">Beschreibung</label>
                  <Textarea
                    id="beschreibung"
                    name="beschreibung"
                    section="allgemeines"
                    value={userData.allgemeines.beschreibung}
                    onChange={handleChange}
                  />
                </form>
              </div>
              <div className="grid-item--turbo">
                <div className="field">
                  <h2>Erholungsrate</h2>

                  <form>
                    <input
                      type="number"
                      id="erholung"
                      name="erholung"
                      data-section="allgemeines"
                      value={userData.allgemeines.erholung}
                      onChange={handleChange}
                    />
                  </form>
                </div>
              </div>
            </div>
            <div className="grid-container--turbo">
              <div className="grid-item--turbo">
                <h2>Aspekte</h2>

                <form>
                  <label htmlFor="konzept">Konzept</label>
                  <Textarea
                    id="konzept"
                    name="konzept"
                    section="aspekt"
                    value={userData.aspekt.konzept}
                    onChange={handleChange}
                  />
                  <label htmlFor="motivation">Motivation</label>
                  <Textarea
                    id="motivation"
                    name="motivation"
                    section="aspekt"
                    value={userData.aspekt.motivation}
                    onChange={handleChange}
                  />
                  <label htmlFor="persoenlich">Persönlicher Aspekt</label>
                  <Textarea
                    id="persoenlich"
                    name="persoenlich"
                    section="aspekt"
                    value={userData.aspekt.persoenlich}
                    onChange={handleChange}
                  />
                  <label htmlFor="geteilt">Geteilter Aspekt</label>
                  <Textarea
                    id="geteilt"
                    name="geteilt"
                    section="aspekt"
                    value={userData.aspekt.geteilt}
                    onChange={handleChange}
                  />
                </form>
              </div>
              <div className="grid-item--turbo">
                <h2>Methoden</h2>

                <form className="form-container">
                  <label htmlFor="flink">Flink</label>
                  <input
                    type="number"
                    min="0"
                    id="flink"
                    name="flink"
                    data-section="methoden"
                    value={userData.methoden.flink}
                    onChange={handleChange}
                  />
                  <label htmlFor="kraftvoll">Kraftvoll</label>
                  <input
                    type="number"
                    min="0"
                    id="kraftvoll"
                    name="kraftvoll"
                    data-section="methoden"
                    value={userData.methoden.kraftvoll}
                    onChange={handleChange}
                  />
                  <label htmlFor="scharfsinnig">Scharfsinnig</label>
                  <input
                    type="number"
                    min="0"
                    id="scharfsinnig"
                    name="scharfsinnig"
                    data-section="methoden"
                    value={userData.methoden.scharfsinnig}
                    onChange={handleChange}
                  />
                  <label htmlFor="sorgfaeltig">Sorgfältig</label>
                  <input
                    type="number"
                    min="0"
                    id="sorgfaeltig"
                    name="sorgfaeltig"
                    data-section="methoden"
                    value={userData.methoden.sorgfaeltig}
                    onChange={handleChange}
                  />
                  <label htmlFor="tollkuehn">Tollkühn</label>
                  <input
                    type="number"
                    min="0"
                    id="tollkuehn"
                    name="tollkuehn"
                    data-section="methoden"
                    value={userData.methoden.tollkuehn}
                    onChange={handleChange}
                  />
                  <label htmlFor="tueckisch">Tückisch</label>
                  <input
                    type="number"
                    min="0"
                    id="tueckisch"
                    name="tueckisch"
                    data-section="methoden"
                    value={userData.methoden.tueckisch}
                    onChange={handleChange}
                  />
                </form>
              </div>
            </div>
            <h2>Stunts</h2>
            <form>
              {userData.stunts.map((stunt, index) => (
                <React.Fragment key={index}>
                  <label htmlFor={stunt.stuntName}>{stunt.stuntName}</label>
                  <Textarea
                    id={stunt.stuntName}
                    name="stuntBeschreibung"
                    data-section="stunts"
                    value={stunt.stuntBeschreibung}
                    onChange={(e) => handleChange(e, index)}
                  />
                </React.Fragment>
              ))}
            </form>
            <div className="grid-container--turbo">
              <div className="grid-item--turbo">
                <h2>Konsequenzen</h2>

                <form className="form-container--v2">
                  <label htmlFor="leicht">Leicht</label>
                  <input
                    type="text"
                    id="leicht"
                    name="leicht"
                    data-section="konsequenzen"
                    value={
                      userData.konsequenzen.leicht
                        ? userData.konsequenzen.leicht
                        : ""
                    }
                    onChange={handleChange}
                  />
                  <label htmlFor="mittel">Mittel</label>
                  <input
                    type="text"
                    id="mittel"
                    name="mittel"
                    data-section="konsequenzen"
                    value={
                      userData.konsequenzen.mittel
                        ? userData.konsequenzen.mittel
                        : ""
                    }
                    onChange={handleChange}
                  />
                  <label htmlFor="schwer">Schwer</label>
                  <input
                    type="text"
                    id="schwer"
                    name="schwer"
                    data-section="konsequenzen"
                    value={
                      userData.konsequenzen.schwer
                        ? userData.konsequenzen.schwer
                        : ""
                    }
                    onChange={handleChange}
                  />
                </form>
              </div>
              <div className="grid-item--turbo">
                <h2>Stress</h2>
                <div className="stress">
                  <form className="custom-checkbox form-container--v2">
                    <label htmlFor="eins">1</label>
                    <button
                      name="eins"
                      id="eins"
                      data-section="stress"
                      onClick={handleChange}
                    >
                      {userData.stress.eins ? "X" : ""}
                    </button>

                    <label htmlFor="zwei">2</label>
                    <button
                      name="zwei"
                      id="zwei"
                      data-section="stress"
                      onClick={handleChange}
                    >
                      {userData.stress.zwei ? "X" : ""}
                    </button>

                    <label htmlFor="drei">3</label>
                    <button
                      name="drei"
                      id="drei"
                      data-section="stress"
                      onClick={handleChange}
                    >
                      {userData.stress.drei ? "X" : ""}
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="button-container button-container--bottom">
              <button className="submit-btn" onClick={handleSubmit}>
                Charakterblatt speichern
              </button>
            </div>
          </>
        ) : null}
        <div className="button-container">
          <button onClick={handleCreate} className="submit-btn">
            Neuen Charakter erstellen
          </button>
        </div>
      </section>
    </>
  );
};

export default TurboFate;
