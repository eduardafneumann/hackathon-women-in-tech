import "./novo-ocorrido.css";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Introducao from "./introducao";
import InformacoesPessoais from "./informacoes-pessoais";
import InformacoesOcorrido from "./informacoes-ocorrido";
import Descricao from "./descricao";

function NovoOcorrido() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    idade: "",
    raca: "",
    identidade_genero: "",
    orientacao_sexual: "",
    municipio: "",
    estado: "",
    tipo: "",
    descricao: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (
      name == "estado" ||
      name == "municipio" ||
      name == "tipo" ||
      name == "data"
    ) {
      if (!value) {
        document.getElementById(name).classList.add("highlight");
      } else {
        document.getElementById(name).classList.remove("highlight");
      }
    }
    setFormData({ ...formData, [name]: value });
  };

  const validadeForms = () => {
    if (
      formData.data &&
      formData.municipio &&
      formData.estado &&
      formData.tipo
    ) {
      setStep(step + 1);
    } else {
      if (!formData.data) {
        document.getElementById("data").classList.add("highlight");
      }
      if (!formData.tipo) {
        document.getElementById("tipo").classList.add("highlight");
      }
      if (!formData.estado) {
        document.getElementById("estado").classList.add("highlight");
      }
      if (!formData.municipio) {
        document.getElementById("municipio").classList.add("highlight");
      }
    }
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/api/ocorridos",
        formData,
      );
      console.log("Event added:", response.data);
    } catch (error) {
      console.error("There was an error adding the event!", error);
    }
    navigate("/");
  };

  const handleSharing = async (event) => {
    setFormData({ ...formData, ["descricao"]: "" });
    handleSubmit(event);
    navigate("/");
  };

  switch (step) {
    case 1:
      return <Introducao nextStep={nextStep} />;
    case 2:
      return (
        <InformacoesPessoais
          formData={formData}
          handleChange={handleChange}
          prevStep={prevStep}
          nextStep={nextStep}
        />
      );
    case 3:
      return (
        <InformacoesOcorrido
          formData={formData}
          handleChange={handleChange}
          nextStep={validadeForms}
          prevStep={prevStep}
        />
      );
    case 4:
      return (
        <Descricao
          formData={formData}
          handleChange={handleChange}
          prevStep={prevStep}
          handleSubmit={handleSubmit}
          handleSharing={handleSharing}
        />
      );
    default:
      return null;
  }
}

export default NovoOcorrido;
