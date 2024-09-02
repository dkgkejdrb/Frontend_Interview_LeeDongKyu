// 2024.04.21: First round of system evaluation improvements
// Added exception handling for empty code *Completed
// Added constraints to the code review model
// Checked and improved slicing logic
// Improved the code review module to provide more concise code review comments

// 2024.05.26: Temporary English version for Thesis
"use client";

import axios from "axios";
import Editor from "@monaco-editor/react";
import { useRef, useEffect, useState, createContext } from "react";
import { Button, Tree, Modal, Spin, Input } from 'antd';
import type { GetProps } from 'antd';
import { TreeLayout, TreeQuizData } from '../assets/quizList_en';
import {
  review_roleSettingPrompt, reviewNecessityPredictionPrompt,
  reviewCommentGenerationPrompt_styleTone, reviewCommentGenerationPrompt_instruction,
  reviewCommentGenerationPrompt_restriction, reviewCommentGenerationPrompt_solution,
  reviewCommentGenerationPrompt_example
} from './prompt-modules/codeFeedbackModule';
import { answerCheckPrompt } from './prompt-modules/answerCheckModule';
import { UnorderedListOutlined, BulbOutlined, CodeOutlined, RobotOutlined, LoadingOutlined } from '@ant-design/icons';

const { TextArea } = Input;

type DirectoryTreeProps = GetProps<typeof Tree.DirectoryTree>;
const { DirectoryTree } = Tree;

// answer check Modal
const ReachableContext = createContext<string | null>(null);

const configSucces = {
  title: 'Correct',
  content: (
    <>
      Great!
    </>
  ),
};

const configFail = {
  title: 'Wrong',
  content: (
    <>
      Try again!
    </>
  ),
};

const configError = {
  title: 'Error',
  content: (
    <>
      Submit your code.
    </>
  ),
};
// .. answer check Modal

// Validate the code submitted by the student
function isCodeEmptyOrNonExecutable(code: string) {
  // Remove comments and empty space, then check if any code remains
  const cleanedCode = code
    .split('\n') // 줄 단위로 분리
    .filter(line => {
      const trimmedLine = line.trim();
      // Check if the line has any content other than comments or empty space
      return trimmedLine && !trimmedLine.startsWith('#');
    })
    .join('');

  // If nothing remains, consider the code empty or non-executable
  return cleanedCode.length === 0;
}

export default function Home() {
  const editorRef = useRef<any>();

  // Actions to perform when the editor is on mount
  function hadleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
  }

  const [response, setResponse] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [extractedCode, setExtractedCode] = useState<string>();
  const [extractedComment, setExtractedComment] = useState<string>();
  useEffect(() => {
    if (response) {
      const startTag_result = "[RNP]";
      const endTag_result = "[/RNP]";
      const startIndex_result = response.indexOf(startTag_result) + startTag_result.length;
      const endIndex_result = response.indexOf(endTag_result);
      const result = response.substring(startIndex_result, endIndex_result).trim();
      const isCodeReviewNeeded = response.slice(0, 20).includes('아니오');

      if (result == "예") {
        const startTag_code = "[RC]";
        const endTag_code = "[/RC]";

        const startIndex_code = response.indexOf(startTag_code) + startTag_code.length;
        const endIndex_code = response.indexOf(endTag_code);
        const extractedCode = response.substring(startIndex_code, endIndex_code).trim();
        setExtractedCode(extractedCode);


        const startTag_comment = "[R]";
        const endTag_comment = "[/R]";

        const startIndex_comment = response.indexOf(startTag_comment) + startTag_comment.length;
        const endIndex_comment = response.indexOf(endTag_comment);
        setExtractedComment(response.substring(startIndex_comment, endIndex_comment).trim());
      }
      if (result == "아니오" || isCodeReviewNeeded) {
        setExtractedComment("잘했어요! 정답 코드를 작성하셨네요. 이제 다음 문제를 도전해보세요. 👍")
      }
    }
  }, [loading])


  const [quiz, setQuiz] = useState<string>("←[문제 은행]에서 문제를 선택해주세요.");
  const [solution, setSolution] = useState<string>();
  // Whether a problem has been selected
  const [isSelect, setIsSelect] = useState<boolean>(false);
  const onSelect: DirectoryTreeProps['onSelect'] = (keys: any, info) => {
    setQuiz(TreeQuizData[keys[0]]);
    setSolution(reviewCommentGenerationPrompt_solution[keys[0]]);

    if (!keys[0].includes("-")) {
      setIsSelect(true);
    } else {
      setIsSelect(false);
      setQuiz("←[문제 은행]에서 문제를 선택해주세요.");
    }
  };

  const [_response, _setResponse] = useState<any>();
  const [_loading, _setLoading] = useState<boolean>(false);
  const [modal, contextHolder] = Modal.useModal();

  return (
    <main style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <>
        <ReachableContext.Provider value="Light">
          {contextHolder}
        </ReachableContext.Provider>
      </>
      <div style={{ width: "100%", height: 50 }}>
      </div>
      <div style={{ display: "flex", width: 1140, height: 600 }}>
        <div className="left" style={{
          borderRadius: "10px 0px 0px 10px",
          borderRight: "1px solid #2c4168", width: 250,
          backgroundColor: "#202f4a"
        }}>
          <div style={{ padding: "10px 25px", borderRadius: "10px 0px 0px 0px", color: "#c7c7c7", backgroundColor: "#314972" }}>
            <UnorderedListOutlined />
            <span style={{ marginLeft: 10 }}>Exercise Bank</span>
          </div>
          <div style={{ height: 550, overflowY: "auto", overflowX: "hidden", }}>
            <DirectoryTree
              style={{ width: 235, padding: "10px 15px" }}

              onSelect={onSelect}
              treeData={TreeLayout()}
            />
          </div>
        </div>
        <div className="middle"
          style={{
            width: 350, backgroundColor: "#202f4a"
          }}>
          <div style={{ padding: "10px 15px", color: "#c7c7c7", backgroundColor: "#314972" }}>
            <BulbOutlined />
            <span style={{ marginLeft: 10 }}>Exercise</span>
          </div>
          <TextArea readOnly={true} variant="borderless" value={quiz} rows={20} style={{ resize: 'none' }} />
        </div>
        <div className="right" style={{ position: "relative", width: 500, borderRadius: "0px 10px 10px 0px", borderLeft: "1px solid #2c4168", backgroundColor: "#202f4a" }}>
          <div style={{ padding: "10px 15px 12px 15px", color: "#c7c7c7", backgroundColor: "#314972", borderRadius: "0px 10px 0px 0px" }}>
            <CodeOutlined />
            <span style={{ marginLeft: 10 }}>Your Code:</span>
          </div>
          {
            isSelect ?
              <div style={{ position: "relative" }}>
                <Editor
                  className="text-animation"
                  width="480px"
                  height="250px"
                  language="python"
                  theme="vs-dark"
                  value={extractedCode}
                  onMount={hadleEditorDidMount}
                  options={{
                    minimap: { enabled: false },
                  }}
                />
                {
                  loading ?
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", top: 10, left: 10, position: "absolute", width: 480, height: 250 }}>
                      <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                    </div>
                    :
                    <></>
                }
              </div>
              :
              <div
                style={{
                  width: 480,
                  height: 250,
                  margin: "10px 10px 0px 10px",
                  borderRadius: 10
                }}
              ></div>
          }

          {
            isSelect ?
              <div style={{ marginTop: 25, display: "flex", justifyContent: "space-between", padding: "0px 10px 0px 10px" }}>
                {
                  _loading ?
                    <Button loading style={{ color: "black", width: 306, backgroundColor: "#96effc", fontWeight: "bold" }}>▷ Submit Code</Button>
                    :
                    <Button
                      onClick={() => {
                        // 2024.04.21::
                        const studentCode = editorRef.current.getValue();
                        if (isCodeEmptyOrNonExecutable(studentCode) === true) {
                          modal.warning(configError);
                          return
                        } if (isCodeEmptyOrNonExecutable(studentCode) === false) {
                          _setLoading(true);
                          axios.post('/api/genAnswerCheck', {
                            headers: {
                              Accept: 'application/json',
                              'Access-Control-Allow-Origin': '*',
                            },
                            data:
                              answerCheckPrompt
                              + "\n\n[파이썬 문제]\n" + quiz + "\n[/파이썬 문제]"
                              + "\n[코드]\n" + editorRef.current.getValue()
                              + "\n\n[정답코드]" + solution + "\n[/정답코드]"
                          })
                            .then(response => {
                              _setResponse(response.data.response.choices[0].message.content);
                              _setLoading(false);
                              const content = response.data.response.choices[0].message.content;
                              if (content.includes("정답")) {
                                modal.success(configSucces);
                              }
                              if (content.includes("틀렸습니다")) {
                                modal.error(configFail);
                              }
                              if (content.includes("에러")) {
                                modal.warning(configError);
                              }
                            })
                            .catch(error => {
                              console.error('에러 발생:', error);
                              _setLoading(false);
                            });
                        }
                      }
                      }
                      style={{ color: "black", width: 306, backgroundColor: "#96effc", fontWeight: "bold" }}
                    >▷ Submit Code</Button>
                }

                {
                  loading ?
                    <Button loading style={{ color: "#dddddd", fontWeight: "bold", width: 164, backgroundColor: "#690db0" }}>Ask Code Tutor</Button>
                    :
                    <Button
                      onClick={() => {
                        // 2024.04.21::
                        const studentCode = editorRef.current.getValue();
                        if (isCodeEmptyOrNonExecutable(studentCode) === true) {
                          modal.warning(configError);
                          // console.log("코드가 비어있습니다.");
                          return
                        } else {
                          setLoading(true);
                          if (isCodeEmptyOrNonExecutable(studentCode) === false) {
                            axios.post('/api/genCodeFeedback', {
                              headers: {
                                Accept: 'application/json',
                                'Access-Control-Allow-Origin': '*',
                              },
                              // 프로젝트 보고서 쓸 때, 아래 data 구조 참고
                              data:
                                review_roleSettingPrompt
                                + reviewNecessityPredictionPrompt
                                + reviewCommentGenerationPrompt_styleTone
                                + reviewCommentGenerationPrompt_instruction
                                + reviewCommentGenerationPrompt_restriction
                                // + reviewCommentGenerationPrompt_exercise
                                + "\n\n[파이썬 문제]\n" + quiz + "\n[/파이썬 문제]"
                                + "\n\n[코드]\n" + studentCode + "\n[/코드]" // reviewCommentGenerationPrompt_code
                                + "\n\n[정답코드]" + solution + "\n[/정답코드]"
                                // 프롬프트 예시 추가
                                + reviewCommentGenerationPrompt_example
                            })
                              .then(response => {
                                console.log('응답 데이터', response.data);
                                setResponse(response.data.response.choices[0].message.content);
                                setLoading(false);
                              })
                              .catch(error => {
                                console.error('에러 발생:', error);
                                setLoading(false);
                              });
                          }
                        }
                      }}
                      style={{ color: "#dddddd", fontWeight: "bold", width: 164, backgroundColor: "#690db0" }}
                    >Ask Code Tutor</Button>
                }

              </div>
              :
              <div style={{ marginTop: 15, height: 32 }}></div>

          }
          <div style={{ marginTop: 15, padding: "10px 15px 12px 15px", color: "#c7c7c7", backgroundColor: "#314972" }}>
            <RobotOutlined />
            <span style={{ marginLeft: 10 }}>Code Tutor:</span>
          </div>
          {
            isSelect ?
              <div
                style={{
                  height: 180,
                  overflowY: "auto",
                  overflowX: "hidden"
                }}>
                {
                  loading ?
                    <div
                      style={{
                        width: 460,
                        minHeight: 145,
                        margin: "10px 10px 0px 10px",
                        border: "1px solid #2c4168",
                        borderRadius: 10,
                        backgroundColor: "#1e1e1e",
                        padding: 10,
                        color: "#dddddd",
                        fontSize: 14,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
                    </div>
                    :
                    <div className="text-animation"
                      style={{
                        width: 460,
                        minHeight: 145,
                        margin: "10px 10px 0px 10px",
                        border: "1px solid #2c4168",
                        borderRadius: 10,
                        backgroundColor: "#1e1e1e",
                        padding: 10,
                        color: "#dddddd",
                        fontSize: 14
                      }}
                    >
                      <span>
                        {extractedComment}
                      </span>
                    </div>
                }
              </div>
              :
              <></>
          }

        </div>
      </div>
    </main>
  );
}