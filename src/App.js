import { useEffect, useState } from "react";
import BotMessage from "./BotMessage";
import "./styles.css";
import UserMessage from "./UserMessage";

const problems = [
  {
    name: "Alteração cadastral",
    response:
      "Para alterar dados cadastrais é necessário conversar com um de nossos atendentes, para isso entre em contato pelo número (41) 9 9999-9999.",
    end: true,
  },
  {
    name: "Envio de boletos",
    response: 'Por gentileza acesse o "menu" e depois em "meus boletos"',
    end: true,
  },
  {
    name: "Meu nome esta negativado no Serasa",
    response:
      "Não se preocupe! Logo após a identificação do pagamento, seu nome será retirado dele em até 5 dias uteis",
    end: true,
  },
  {
    name: "Nenhuma das opções",
    response: "Veja mais algumas opções por favor",
    problems: [
      {
        name: "Não consigo pagar na data de vencimento, posso pagar outro dia?",
        response:
          "Sem problemas! É possível efetuar o pagamento com até 5 dias de atraso, caso ultrapasse esse prazo, recomendo que você converse com um de nossos atendentes.",
        end: true,
      },
      {
        name: "Meu boleto está com erro!",
        response:
          "Não se preocupe, o credor pode levar até 3 horas úteis para registrar o boleto. Caso ultrapasse esse prazo e você ainda não consiga realizar o pagamento, precisamos avaliar mais a fundo, então por gentileza converse com um de nossos atendentes.",
        end: true,
      },
      {
        name: "Quero falar por telefone!",
        response:
          "Infelizmente não realizamos contato telefonico, mas é possivel entrar em contato via WhatsApp pelo número (41) 9 9999-9999",
        end: true,
      },
      {
        name: "Quero conversar com um atendente via WhatsApp",
        response:
          "Você pode entrar em contato via WhatsApp pelo número (41) 9 9999-9999",
        end: true,
      },
    ],
  },
];

function App() {
  const [requestResponse, setRequestResponse] = useState(false);
  const [conversation, setConversation] = useState([
    <BotMessage message="Olá, sou o AnswerBot!" />,
  ]);
  const [endConversation, setEndConversation] = useState(false);
  const [activeProblem, setActiveProblem] = useState(problems);
  useEffect(() => {
    setTimeout(() => {
      setConversation((oldState) => {
        let state = [...oldState];
        state.push(<BotMessage message="Em que posso lhe ajudar?" />);
        return state;
      });
      setRequestResponse(true);
    }, 500);
  }, []);
  useEffect(() => {
    document.getElementById("body").scrollBy(0, 1000);
  }, [conversation]);
  return (
    <div className="App">
      <div className="chat">
        <div className="header">Answer Bot</div>
        <div className="body" id="body">
          {conversation.map((message) => message)}
        </div>
        <div className="responses">
          {requestResponse &&
            !endConversation &&
            activeProblem.map((problem, index) => {
              return (
                <div
                  className="response"
                  onClick={() => {
                    setRequestResponse(false);
                    setConversation((oldState) => {
                      let state = [...oldState];
                      state.push(<UserMessage message={problem.name} />);
                      return state;
                    });
                    setTimeout(() => {
                      setConversation((oldState) => {
                        let state = [...oldState];
                        state.push(<BotMessage message={problem.response} />);
                        return state;
                      });
                      setRequestResponse(true);
                      if (problem.end) {
                        setConversation((oldState) => {
                          let state = [...oldState];
                          state.push(
                            <BotMessage message="Resolveu o seu problema?" />
                          );
                          return state;
                        });
                        setEndConversation(true);
                        setActiveProblem([]);
                      } else
                        setActiveProblem(
                          (oldState) => oldState[index].problems
                        );
                    }, 500);
                  }}
                >
                  {problem.name}
                </div>
              );
            })}
          {endConversation && (
            <>
              <div
                className="response"
                onClick={() => {
                  setConversation((oldState) => {
                    let state = [...oldState];
                    state.push(<UserMessage message="Sim" />);
                    return state;
                  });
                  setEndConversation(false);
                  setTimeout(() => {
                    setConversation((oldState) => {
                      let state = [...oldState];
                      state.push(<BotMessage message="Obrigado, até logo!" />);
                      return state;
                    });
                  }, 500);
                }}
              >
                Sim
              </div>
              <div
                className="response"
                onClick={() => {
                  setConversation((oldState) => {
                    let state = [...oldState];
                    state.push(<UserMessage message="Nao" />);
                    return state;
                  });
                  setEndConversation(false);
                  setTimeout(() => {
                    setConversation((oldState) => {
                      let state = [...oldState];
                      state.push(
                        <BotMessage message="Converse com um de nosso atendentes através do número (41) 9 9999-9999" />
                      );
                      return state;
                    });
                  }, 500);
                }}
              >
                Não
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
