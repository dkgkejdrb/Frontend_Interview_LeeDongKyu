import { ReloadOutlined, PlusOutlined } from '@ant-design/icons';
import { Spin, Button, Input, Tag, Space, Image, Modal, Select } from "antd";
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ClovaStudioSlice from '../../store/slices/ClovaStudioSlice';
import uuid from 'react-uuid';
import ErrorPage from '../../components/ErrorPage';
import getNewFileContent from '../../assets/files/getNewFileContent';
import GetAuthCheck from '../../hooks/getAuthCheck';
import ClovaStudioParamsSelector from '../../components/ClovaStudioParamsSelector';
import ClovaStudioParamsSlider from '../../components/ClovaStudioParamsSlider';
import ClovaStudioParamsTextInput from '../../components/ClovaStudioParamsTextInput';

const { TextArea } = Input;
const today = new Date(Date.now()); // Define current date
const newFileContent = getNewFileContent(); // When 'Create New File' is clicked, get default contents for new file

const ClovaStudio = () => {
    // Validate auth information from LCMS to iframe
    // Get user information(iframeData.clsId, iframeData.stdId) for API call
    const { authError, iframeData } = GetAuthCheck();

    // ★ Feature 1: Run prompt via engine api url
    const [loading, setLoading] = useState(false);
    // Validate existence of both title and text
    const onSubmit = () => {
        if (!title) {
            alert("타이틀이 없으면, 실행할 수 없습니다.")
            return;
        }
        if (!text) {
            alert("텍스트가 없으면, 실행할 수 없습니다.")
            return;
        }

        // Change from '↵' in parameters(tags, inputValue2, inputValue3) to '\n' for api call 
        let _tags = []
        tags.forEach((_tag) => {
            let __tag = _tag.replaceAll('↵', '\n');
            _tags.push(__tag);
        });
        const _inputValue2 = inputValue2.replaceAll('↵', '\n');
        const _inputValue3 = inputValue3.replaceAll('↵', '\n');

        const data = {
            "engine": engine,
            "topP": topPValue,
            "topK": topKValue,
            "text": text,
            "maxTokens": maxTokens,
            "temperature": temperature,
            "repeatPenalty": repetitionPenalty,
            "stopBefore": _tags,
            "start": _inputValue2,
            "restart": _inputValue3,
            "includeTokens": true,
            "includeAiFilters": true,
            "includeProbs": false
        };

        setLoading(true);
        axios.post(engine, data, {
            headers: {
                "Content-Type": 'application/json',
            }
        })
            .then((res) => {
                // Get and show Clova AI's response
                setText(res.data.result.text);
                setOutputTokens(res.data.result.outputText);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            })
    }
    // ... ★ Feature 1: Run prompt via engine api url


    // ★ Feature 2: States and handler functions of parameters for prompt engineering 
    // Check if param's sections is clicked 
    const [clickedStateArray, setClickedStateArray] = useState([false, false, false, false, false, false, false, false, false]);
    const updateClickedStateArray = (index) => {
        setClickedStateArray(prevState => prevState.map((_, i) => i === index));
    };

    // State and handler: Engine
    // Via this engine's value, user can get response of Clova AI
    const [engine, setEngine] = useState("/testapp/v1/completions/LK-B");
    const onChangeEngine = (e) => {
        setEngine(e);
    }

    // Sate and handler: Title
    const [title, setTitle] = useState("");
    const onChangeTitle = (e) => {
        setTitle(e.target.value)
    }

    // State and handler: Text
    // Text consists of examples for users' requests and Clova's response
    const [text, setText] = useState("");
    const onChangeText = (e) => {
        setText(e.target.value);
    }

    // State and handler: topP
    const [topPValue, setTopPValue] = useState(0.8);
    const onChangeTopP = (v) => {
        typeof v === "object"
            ?
            !v
                ?
                setTopPValue(0)
                :
                setTopPValue(v[0])
            : setTopPValue(v)
        updateClickedStateArray(1)
    }

    //  State and handler: topK
    const [topKValue, setTopKValue] = useState(0);
    const onChangeTopK = (v) => {
        typeof v === "object"
            ?
            !v
                ?
                setTopKValue(0)
                :
                setTopKValue(v[0])
            : setTopKValue(v)
        updateClickedStateArray(2)
    }

    // State and handler: maxTokens
    const [maxTokens, setMaxTokens] = useState(100);
    const onChangeMaxTokens = (v) => {
        typeof v === "object"
            ?
            !v
                ?
                setMaxTokens(0)
                :
                setMaxTokens(v[0])
            : setMaxTokens(v)
        updateClickedStateArray(3);
    }

    // State and handler: temperature
    const [temperature, setTemperature] = useState(0.5);
    const onChangeTemperature = (v) => {
        typeof v === "object"
            ?
            !v
                ?
                setTemperature(0)
                :
                setTemperature(v[0])
            : setTemperature(v)
        updateClickedStateArray(4);
    }

    // State and handler: repetitionPenalty
    const [repetitionPenalty, setRepetitionPenalty] = useState(5);
    const onChangeRepetitionPenalty = (v) => {
        typeof v === "object"
            ?
            !v
                ?
                setRepetitionPenalty(0)
                :
                setRepetitionPenalty(v[0])
            : setRepetitionPenalty(v)
        updateClickedStateArray(5);
    }

    // State and handler: Tags
    // When user types a word and presses 'Tab' on keyboard, that word is displayed in the bottom section 
    const [tags, setTags] = useState([]);
    // Tags for sending to server
    const [tagsSent, setTagsSent] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [selectionStart1, setSelectionStart1] = useState(0);
    // When user presses 'Tab', prevent cursor from moving next section('inject start text')
    const inputRef = useRef(null);
    const handleClose = (removedTag) => {
        const newTags = tags.filter((tag) => tag !== removedTag);
        setTags(newTags);
        setTagsSent(newTags);
    };
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        updateClickedStateArray(6);
    };
    // state for working immediately 
    const [tabPressed, setTabPressed] = useState(false);
    const handleInputConfirm = () => {
        if (inputValue) {
            inputRef.current.input.focus();
        }
        if (inputValue && tags.indexOf(inputValue) === -1) {
            const inputValueSent = inputValue.replace(/↵/g, '\n');
            setTags([...tags, inputValue]);
            setTagsSent([...tagsSent, inputValueSent]);
        }
        setInputValue('');
    };

    useEffect(() => {
        if (tabPressed) {
            handleInputConfirm();
            setTabPressed(false);
        }
        // eslint-disable-next-line
    }, [tabPressed])

    const onPressAfter = (e) => {
        if (e.code === "Enter") {
            e.target.selectionStart = selectionStart1 + 1;
            e.target.selectionEnd = e.target.selectionStart;
            // console.log(`${e.target.selectionStart} / ${e.target.selectionEnd}`)
        }
    };

    const onPressBefore = (e) => {
        if (e.code === "Enter" && e.nativeEvent.isComposing === false) {
            setSelectionStart1(e.target.selectionEnd);
            let slicedBeforeWords = inputValue.slice(0, e.target.selectionEnd);

            let slicedAfterWords = inputValue.slice(e.target.selectionEnd);
            setInputValue(slicedBeforeWords + '↵' + slicedAfterWords);
        }
        if (e.code === "Tab") {
            e.preventDefault();
            setTabPressed(!tabPressed);
        }
    };

    // Add 'inject start text' to the text before Clova's response
    const [inputValue2, setInputValue2] = useState('');
    const [selectionStart2, setSelectionStart2] = useState(0);
    const handleInputChange2 = (e) => {
        setInputValue2(e.target.value);
        updateClickedStateArray(7);
    };
    const onPressAfter2 = (e) => {
        if (e.code === "Enter") {
            e.target.selectionStart = selectionStart2 + 1;
            e.target.selectionEnd = e.target.selectionStart;
        }
    };
    const onPressBefore2 = (e) => {
        if (e.code === "Enter" && e.nativeEvent.isComposing === false) {
            setSelectionStart2(e.target.selectionEnd);
            let slicedBeforeWords = inputValue2.slice(0, e.target.selectionEnd);
            let slicedAfterWords = inputValue2.slice(e.target.selectionEnd);
            setInputValue2(slicedBeforeWords + '↵' + slicedAfterWords);
        }
    };

    // Add 'inject start text' to the text after Clova's response
    const [inputValue3, setInputValue3] = useState('');
    const [selectionStart3, setSelectionStart3] = useState(0);
    const handleInputChange3 = (e) => {
        setInputValue3(e.target.value);
        updateClickedStateArray(8);
    };
    const onPressAfter3 = (e) => {
        if (e.code === "Enter") {
            e.target.selectionStart = selectionStart3 + 1;
            e.target.selectionEnd = e.target.selectionStart;
        }
    };
    const onPressBefore3 = (e) => {
        if (e.code === "Enter" && e.nativeEvent.isComposing === false) {
            setSelectionStart3(e.target.selectionEnd);
            let slicedBeforeWords = inputValue3.slice(0, e.target.selectionEnd);
            let slicedAfterWords = inputValue3.slice(e.target.selectionEnd);
            setInputValue3(slicedBeforeWords + '↵' + slicedAfterWords);
        }
    };
    // ... ★ Feature 2: States and handler functions of parameters for prompt engineering 


    // ★ Feature 3: Download file
    const [fileName, setFileName] = useState(
        `챗봇 데이터_${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}`
    );
    const onChangeFileName = (e) => {
        setFileName(e.target.value);
    }
    const downloadJsonFile = () => {
        let contentText = {
            "name": fileName,
            "engine": engine,
            "topP": topPValue,
            "topK": topKValue,
            "title": title,
            "text": text,
            "maxTokens": maxTokens,
            "temperature": temperature,
            "repeatPenalty": repetitionPenalty,
            "start": inputValue2,
            "restart": inputValue3,
            "stopBefore": tags,
            "includeTokens": true,
            "includeAiFilters": true,
            "includeProbs": false
        };

        const copiedfiles = [...files]
        copiedfiles[fileIndex] = contentText;
        setFiles(copiedfiles);

        // Transform from Object in javascript to Json
        let contentJson = JSON.stringify(contentText);

        const element = document.createElement('a');
        const file = new Blob([contentJson], {
            type: "application/json"
        });
        element.href = URL.createObjectURL(file);

        // Filename must except '.'
        // If '.' is involved in filename, change it to '_'
        if (fileName.indexOf(".") !== -1) {
            const validFileName = fileName.replaceAll('.', '_')
            element.download = validFileName;
            document.body.appendChild(element);
            element.click();
        } else {
            element.download = fileName;
            document.body.appendChild(element);
            element.click();
        }
    };
    // ... ★ Feature 3: Download file

    // ★ Feature 4: Upload file on server
    const submitHandler = () => {
        // User must select file before uploading
        if (fileIndex === null) {
            showSelectModal();
            return
        }
        // Array of Object containg the contents of uploading files
        const postFiles = [];
        // If any required values are empty, each missing value is added to an error message
        const errorLog = []
        files.forEach((file, i) => {
            let _file = {};
            // row
            let row = {};
            for (let key in file) {
                if (!(file[key])) {
                    if (file[key] !== 0 && (file[key] !== true && file[key] !== false)) {
                        if (key === "title") {
                            // errorLog.push(`${i+1}번째 파일에 '타이틀'이 없습니다.`)
                            row[key] = '타이틀';
                            row["fileNum"] = i + 1;
                        }
                        if (key === "text") {
                            // errorLog.push(`${i+1}번째 파일에 '텍스트'가 없습니다.`)
                            row[key] = '텍스트';
                            row["fileNum"] = i + 1;
                        }
                        if (key === "start") {
                            // errorLog.push(`${i+1}번째 파일에 '시작문자'가 없습니다.`)
                            row[key] = '시작문자';
                            row["fileNum"] = i + 1;
                        }
                        if (key === "restart") {
                            // errorLog.push(`${i+1}번째 파일에 '끝문자'가 없습니다.`)
                            row[key] = '끝문자';
                            row["fileNum"] = i + 1;
                        }
                    }
                }
                if (key === "stopBefore" && file[key].length === 0) {
                    // errorLog.push(`${i+1}번째 파일에 '정지문자'가 없습니다.`)
                    row[key] = "정지문자";
                    row["fileNum"] = i + 1;
                }

                if (key !== "stopBefore") {
                    if (key === "maxTokens") {
                        _file["maxToken"] = file[key];
                    }
                    else {
                        if (key === "title") {
                            _file["subject"] = file[key];
                        }
                        else {
                            _file[key] = file[key];
                        }
                    }
                }
                else {
                    _file[key] = file[key].join();
                }
            }
            postFiles.push(_file);
            errorLog.push(row);
        })

        // Make a single string for error log
        if (!errorLog.every(log => Object.keys(log).length === 0)) {
            let res = "※아래 항목이 비어있습니다.\n"
            errorLog.forEach((log, i, ar) => {
                for (let key in log) {
                    if (key === "fileNum") {
                        res = res + `\n[${log["fileNum"]}] 번째 파일\n`
                    }
                }
                for (let key in log) {
                    if (log) {
                        if (key === "title") {
                            res = res + "  -타이틀\n"
                        } else if (key === "text") {
                            res = res + "  -텍스트\n"
                        } else if (key === "start") {
                            res = res + "  -시작문자\n"
                        } else if (key === "restart") {
                            res = res + "  -끝문자\n"
                        } else if (key === "stopBefore") {
                            res = res + "  -정지문자\n"
                        }
                    }
                }
            })
            window.alert(res);
            return
        }

        // Http's body for uploading file on server
        const data = {
            "memberId": iframeData?.stdId,
            "classId": iframeData?.clsId,
            // "practices": [...files]
            "practices": [...postFiles]
        }

        // ★ If a user uses this feature first time, api's method is 'POST'
        if (isFirstUseUser) {
            axios.post("https://clova-practice.codingbiz.creverse.com/api/practice", data, {
                headers: {
                    "Content-Type": 'application/json',
                }
            }).then((res) => {
                window.alert("서버에 성공적으로 업로드되었습니다.")
            }).catch((error) => {
                console.log(error)
            })
            setIsFirstUseUser(false); // post 후에는 첫 사용자가 아니게 됨
        }
        // ★ If a user uses this feature not first time, api's method is 'PUT'
        else {
            axios.put("https://clova-practice.codingbiz.creverse.com/api/practice", data, {
                headers: {
                    "Content-Type": 'application/json',
                }
            }).then((res) => {
                window.alert("서버에 성공적으로 업로드되었습니다.")
            }).catch((error) => {
                console.log(error)
            })
        }
    }
    // ... ★ Feature 4: Upload file on server

    // ★ Feature 5: Load files from server
    const [firstLoading, setFirstLoading] = useState(true);
    const [isFirstUseUser, setIsFirstUseUser] = useState(false);
    const [_id, _setId] = useState(null);
    useEffect(() => {
        // In case of a first time user
        const getURL = `https://clova-practice.codingbiz.creverse.com/api/practice/class/${iframeData.clsId}/member/${iframeData.stdId}`;

        if (iframeData.clsId && iframeData.stdId) {
            axios.get(getURL)
                .then((res) => {
                    let getFiles = [];
                    const practices = res.data.practices;
                    setFirstLoading(true);
                    practices.forEach((file, i) => {
                        let _file = {};
                        for (let key in file) {
                            if (key !== "stopBefore") {
                                if (key === "maxToken") {
                                    _file["maxTokens"] = file[key];
                                }
                                else {
                                    if (key === "subject") {
                                        _file["title"] = file[key];
                                    }
                                    else {
                                        _file[key] = file[key];
                                    }
                                }
                            }
                            else {
                                if (file[key].length > 0) {
                                    _file[key] = file[key].split(','); // Convert stop sequences into an array by splitting them at each ','
                                }
                            }
                        }
                        getFiles.push(_file);
                    })
                    setFiles(getFiles);
                    setFirstLoading(false);
                })
                .catch((error) => {
                    setFirstLoading(true);
                    setFirstLoading(false);
                    console.log(error);
                    // In case of a first time user
                    if (error.response.status === 404) {
                        // console.log("첫 사용자 확인")
                        setIsFirstUseUser(true);
                    }
                })
        }
        // eslint-disable-next-line
    }, [iframeData])
    /// ... ★ Feature 5: Load files from server

    // ★ Feature 6: Load files from local PC
    // Global state of File's index
    const dispatch = useDispatch();
    const [files, setFiles] = useState([]);
    const fileIndex = useSelector(state => {
        return state.ClovaStudioSlice.fileIndex;
    })
    // ★ Warning: This hook triggers when either loading a file or changing parameter values
    useEffect(() => {
        // If not press 'Delete' btn, and not mount
        if (!onlyActiveDelete && !firstLoading) {
            let contentText = {
                "id": _id,
                "name": fileName,
                "engine": engine,
                "topP": topPValue,
                "topK": topKValue,
                "title": title,
                "text": text,
                "maxTokens": maxTokens,
                "temperature": temperature,
                "repeatPenalty": repetitionPenalty,
                "start": inputValue2,
                "restart": inputValue3,
                "stopBefore": tags,
                "includeTokens": true,
                "includeAiFilters": true,
                "includeProbs": false
            };
            const copiedfiles = [...files]
            copiedfiles[fileIndex] = contentText;
            setFiles(copiedfiles);
        }
        setOnlyActiveDelete(false);
        // eslint-disable-next-line
    }, [fileIndex, fileName, engine, topPValue, topKValue, title, text, maxTokens, temperature, repetitionPenalty, inputValue2, inputValue3, tags]);


    const inputHidden = useRef(null);
    // Before loading file, display a modal to confirm whether to save the current prompt
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = (e) => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
        downloadJsonFile();
        inputHidden.current?.click();
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        inputHidden.current?.click();
    };

    // Confirm if file type is '.json'
    const uploadJsonFile = (e) => {
        let fileToJsonValues = files;
        const fileValues = Object.values(e.target.files)
        fileValues.forEach((file) => {
            let extention = file.name.slice(file.name.indexOf(".") + 1).toLowerCase();
            if (extention !== "json") {
                alert(`[ ${file.name} ] 은 지원하지 않는 파일형식입니다.`);
                return;
            }
            let reader = new FileReader();
            reader.onload = () => {
                let jsonStr = reader.result;
                let jsonObj = JSON.parse(jsonStr);
                setFiles([...fileToJsonValues, jsonObj]);
                fileToJsonValues.push(jsonObj);
            }
            reader.readAsText(file)
        });
    };
    // ... ★ Feature 6: Load files from local PC


    // ★ Feature 7: default setting for first time use
    useEffect(() => {
        const initFile = [];
        initFile.push(newFileContent);
        // console.log("업로드버튼과 상관없이 한번만 콜되어야 함")
        setFiles(initFile)
    }, [])
    // ... ★ Feature 7: default setting for first time use


    // ★ Feature 8: Add a new file
    const newFile = () => {
        let contentText = newFileContent;
        setFiles([...files, contentText]);
    }
    // ... ★ Feature 8: Add a new file


    // ★ Feature 9: Clear the file selected
    // Display a modal to confirm whether to save the current prompt
    const [isModalReloadOpen, setIsModalReloadOpen] = useState(false);
    const showReloadModal = (e) => {
        setIsModalReloadOpen(true);
    };
    const handleReloadOk = () => {
        setFileName(`챗봇 데이터_${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}`);
        setEngine("/testapp/v1/completions/LK-B");
        setTitle("");
        setText("");
        setTopPValue(0.8);
        setTopKValue(0);
        setMaxTokens(100);
        setTemperature(0.5);
        setRepetitionPenalty(5);
        setTags([]);
        setInputValue2('');
        setInputValue3('');
        setIsModalReloadOpen(false);
    };
    const handleReloadCancel = () => {
        setIsModalReloadOpen(false);
    };

    const reload = () => {
        showReloadModal();
    }
    // ... ★ Feature 9: Clear the file selected


    // ★ Feature 9: Response from Clova is shown on the console section
    const [outputTokens, setOutputTokens] = useState(null);
    // ... ★ Feature 9: Response from Clova is shown on the console section


    // ★ Feature 10: Delete file selected on file list
    // 생성된 카드의 배열
    const cardRefs = useRef([]);
    const [deleteState, setDeleteState] = useState(true);
    useEffect(() => {
        // Ensure uniqueness during removal
        // If the practice.id is the same as the current one, it cannot be removed
        if (files.length > 0) {
            const uidURL = `https://clova-practice.codingbiz.creverse.com/api/practice/class/${iframeData.clsId}/member/${iframeData.stdId}`;

            axios.get(uidURL)
                .then((res) => {
                    const practiceUid = res.data.practiceUid;
                    const getURL = `https://clova-practice.codingbiz.creverse.com/api/practice?uid=${practiceUid}`;
                    axios.get(getURL)
                        .then((res) => {
                            const data = res.data;
                            if (data.practiceItem.id === _id) {
                                window.alert("제거할 수 없습니다. ※ 랜딩페이지에서 설정된 학습데이터입니다.")
                            } else {
                                const copiedFiles = [...files];
                                copiedFiles.splice(fileIndex, 1);
                                setFiles(copiedFiles);
                            }
                        })
                        .catch((error) => {
                            console.log(error)
                            if (error.response.status === 404) {
                                console.log("학습 데이터 O, 랜딩페이지 설정 데이터 X, 제거 O");
                                const copiedFiles = [...files];
                                copiedFiles.splice(fileIndex, 1);
                                setFiles(copiedFiles);
                            }
                        })
                })
                .catch((error) => {
                    console.log(error)
                    if (error.response.status === 404) {
                        console.log("첫회원 | 학습 데이터 X, 랜딩페이지 설정 데이터 X, 제거 O")
                        const copiedFiles = [...files];
                        copiedFiles.splice(fileIndex, 1);
                        setFiles(copiedFiles);
                        console.log(copiedFiles)
                    }
                })
            dispatch(ClovaStudioSlice.actions.setFileIndex(null));
        }
    }, [deleteState]);

    const [onlyActiveDelete, setOnlyActiveDelete] = useState(false);
    // If user pressses 'Delete' btn on file card, update state
    const deleteFile = () => {
        setDeleteState(!deleteState);
        setOnlyActiveDelete(true);
    }
    // ... ★ Feature 10: Delete file selected on file list

    // ★ Feature 11: Choose file and display file on screen
    const selectFile = (e) => {
        const index = e.target.className ? e.target.className : 0;
        const clickedCard = files[index];
        dispatch(ClovaStudioSlice.actions.setFileIndex(index));
        _setId(clickedCard.id);
        setFileName(clickedCard.name);
        setEngine(clickedCard.engine);
        setTitle(clickedCard.title);
        setText(clickedCard.text);
        setTopPValue(clickedCard.topP);
        setTopKValue(clickedCard.topK);
        setMaxTokens(clickedCard.maxTokens);
        setTemperature(clickedCard.temperature);
        setRepetitionPenalty(clickedCard.repeatPenalty);
        const _tags = [];
        const __tags = clickedCard.stopBefore;
        __tags.forEach((tag) => {
            const _tag = tag.replaceAll('\n', '↵');
            _tags.push(_tag);
        })
        setTags(_tags);

        if (clickedCard.start || clickedCard.start !== "") {
            const value = clickedCard.start.replaceAll('\n', '↵');
            setInputValue2(value);
        } else {
            setInputValue2(clickedCard.start);
        }
        if (clickedCard.restart || clickedCard.restart !== "") {
            const value = clickedCard.restart.replaceAll('\n', '↵');
            setInputValue3(value);
        } else {
            setInputValue3(clickedCard.restart);
        }
    }
    // ... ★ Feature 11: Choose file and display file on screen

    // ★ Feature 12: fileIndex is 'null', display warning popup for selecting a file
    const [isModalSelectOpen, setIsModalSelectOpen] = useState(false);
    const showSelectModal = (e) => {
        setIsModalSelectOpen(true);
    };
    const handleSelectCancel = () => {
        setIsModalSelectOpen(false);
    };
    // ... ★ Feature 12: fileIndex is 'null', display warning popup for selecting a file

    return (
        <main
            className="main"
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                paddingTop: 20,
            }}
        >
            {
                // !authError ?
                //     (
                //         <ErrorPage />
                //     )
                //     : (
                <>
                    {
                        <Modal
                            open={isModalSelectOpen}
                            onOk={handleSelectCancel}
                            closable={false}
                            okText="확인"
                            cancelButtonProps={{ style: { display: "none" } }}
                        >
                            <p>업로드하기 위해, 파일을 선택해주세요.</p>
                        </Modal>
                    }
                    <div
                        className="main_left"
                        style={{
                            width: 200,
                            height: "100%",
                            display: "flex",
                            justifyContent: "center"
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <div
                                style={{
                                    marginBottom: 5,
                                    width: "100%",
                                    height: 30,
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    alignItems: "center",
                                }}
                            >
                                <Image width={60}
                                    // src={logo} 
                                    preview={false} />
                                <Input
                                    placeholder={"파일이름 입력"}
                                    value={fileName}
                                    style={{
                                        marginLeft: 10,
                                        width: 110,
                                        fontWeight: "600",
                                        fontSize: 12,
                                    }}
                                    onChange={(e) => onChangeFileName(e)}
                                />
                            </div>

                            <ClovaStudioParamsSelector
                                label="학습엔진(Engine)"
                                options={[
                                    {
                                        value: "/testapp/v1/completions/LK-B",
                                        label: "LK-B",
                                    },
                                    {
                                        value: "/testapp/v1/completions/LK-C",
                                        label: "LK-C",
                                    },
                                    {
                                        value: "/testapp/v1/completions/LK-D2",
                                        label: "LK-D2",
                                    },
                                    {
                                        value: "/testapp/v1/completions/LE-C",
                                        label: "LE-C",
                                    },]}
                                value={engine}
                                onChangeValue={onChangeEngine}
                                clickedStateArray={clickedStateArray}
                                index={0}
                                setClickedStateArray={setClickedStateArray}
                            />

                            <ClovaStudioParamsSlider
                                label="누적확률조절"
                                description="(Top P)"
                                value={topPValue}
                                min={0}
                                max={1}
                                step={0.1}
                                onChangeValue={onChangeTopP}
                                clickedStateArray={clickedStateArray}
                                index={1}
                                setClickedStateArray={setClickedStateArray}
                            />

                            <ClovaStudioParamsSlider
                                label="상위순위조절"
                                description="(TopK)"
                                value={topKValue}
                                min={0}
                                max={128}
                                step={1}
                                onChangeValue={onChangeTopK}
                                clickedStateArray={clickedStateArray}
                                index={2}
                                setClickedStateArray={setClickedStateArray}
                            />

                            <ClovaStudioParamsSlider
                                label="출력문장수조절"
                                description="(Max tokens)"
                                value={maxTokens}
                                min={0}
                                max={600}
                                step={1}
                                onChangeValue={onChangeMaxTokens}
                                clickedStateArray={clickedStateArray}
                                index={3}
                                setClickedStateArray={setClickedStateArray}
                            />

                            <ClovaStudioParamsSlider
                                label="다양성조절"
                                description="(Temperature)"
                                value={temperature}
                                min={0}
                                max={1}
                                step={0.1}
                                onChangeValue={onChangeTemperature}
                                clickedStateArray={clickedStateArray}
                                index={4}
                                setClickedStateArray={setClickedStateArray}
                            />

                            <ClovaStudioParamsSlider
                                label="중복표현억제조절"
                                description="(Repetition penalty)"
                                value={repetitionPenalty}
                                min={0}
                                max={10}
                                step={1}
                                onChangeValue={onChangeRepetitionPenalty}
                                clickedStateArray={clickedStateArray}
                                index={5}
                                setClickedStateArray={setClickedStateArray}
                            />

                            <div
                                style={{
                                    width: 200,
                                    marginBottom: "10px",
                                    display: "flex",
                                    position: "relative",
                                }}
                            >
                                <div className="left" style={{ width: 190 }}>
                                    <div
                                        className={clickedStateArray[6] ? "clicked" : "unclicked"}
                                        style={{
                                            marginBottom: "10px",
                                            letterSpacing: "-1px",
                                            fontSize: 14,
                                        }}
                                    >
                                        정지문자(Stop sequences)
                                    </div>
                                    <Space size={[0, 8]} wrap>
                                        <Space size={[0, 8]} wrap>
                                            {/* 인풋창 */}
                                            <Input
                                                className="stopSequence"
                                                type="text"
                                                size="small"
                                                placeholder="키워드 입력 후 Tab"
                                                style={{ width: 190, height: 30 }}
                                                value={inputValue}
                                                onChange={handleInputChange}
                                                // onBlur={handleInputConfirm}
                                                ref={inputRef}
                                                onKeyDown={onPressAfter}
                                                onKeyDownCapture={onPressBefore}
                                                onClick={() => {
                                                    setClickedStateArray([
                                                        false,
                                                        false,
                                                        false,
                                                        false,
                                                        false,
                                                        false,
                                                        true,
                                                        false,
                                                        false,
                                                    ]);
                                                }}
                                            />
                                        </Space>
                                        <div style={{ minHeight: 36 }}>
                                            {tags.map((tag, index) => {
                                                const isLongTag = tag.length > 20;
                                                const tagElem = (
                                                    <Tag
                                                        key={tag}
                                                        closable
                                                        style={{
                                                            userSelect: "none",
                                                        }}
                                                        onClose={() => handleClose(tag)}
                                                    >
                                                        <span>
                                                            {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                                                        </span>
                                                    </Tag>
                                                );
                                                return tagElem;
                                            })}
                                        </div>
                                    </Space>
                                </div>
                            </div>

                            <ClovaStudioParamsTextInput
                                label="시작문자(Inject start text)"
                                value={inputValue2}
                                onChange={handleInputChange2}
                                onKeyDown={onPressAfter2}
                                onKeyDownCapture={onPressBefore2}
                                clickedStateArray={clickedStateArray}
                                index={7}
                                setClickedStateArray={setClickedStateArray}
                            />

                            <ClovaStudioParamsTextInput
                                label="끝문자(Inject restart text)"
                                index={8}
                                value={inputValue3}
                                onChange={handleInputChange3}
                                onKeyDown={onPressAfter3}
                                onKeyDownCapture={onPressBefore3}
                                clickedStateArray={clickedStateArray}
                                setClickedStateArray={setClickedStateArray}
                            />
                        </div>
                    </div>

                    <div
                        className="main_center"
                        style={{
                            width: 580,
                            height: "800px",
                            display: "flex",
                            flexDirection: "column",
                            borderLeft: "1px solid #e7e7e7",
                        }}
                    >
                        <div
                            style={{
                                width: "100%",
                                height: 30,
                                marginLeft: 10,
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "center",
                            }}
                        >
                            <Button
                                onClick={newFile}
                                icon={<PlusOutlined />}
                                style={{ width: 30, height: 30, fontSize: 12 }}
                            ></Button>
                            <Button
                                onClick={reload}
                                icon={<ReloadOutlined />}
                                style={{ marginLeft: 5, fontSize: 12 }}
                            ></Button>
                            <>
                                <Modal
                                    title="초기화"
                                    open={isModalReloadOpen}
                                    onOk={handleReloadOk}
                                    onCancel={handleReloadCancel}
                                    okText="네"
                                    cancelText="아니오"
                                >
                                    <p>현재 선택한 파일을 초기화하시겠습니까?</p>
                                </Modal>
                            </>
                            <Button
                                onClick={showModal}
                                style={{ fontSize: 12, marginLeft: 10 }}
                            >
                                파일 열기
                            </Button>
                            <>
                                <Modal
                                    title="저장 후, 불러오기"
                                    open={isModalOpen}
                                    onOk={handleOk}
                                    onCancel={handleCancel}
                                    okText="네(저장 후 불러오기)"
                                    cancelText="아니오"
                                >
                                    <p>현재 작업중인 파일이 사라집니다. </p>
                                    <p>저장 후 불러올까요?</p>
                                </Modal>
                            </>
                            {/* 숨김처리되어야 하는 input */}
                            <input
                                ref={inputHidden}
                                type="file"
                                onChange={(e) => uploadJsonFile(e)}
                                style={{ display: "none" }}
                                multiple
                            ></input>
                            <Button
                                onClick={downloadJsonFile}
                                style={{ fontSize: 12, marginLeft: 5 }}
                            >
                                파일 저장
                            </Button>
                            {/* 서버 저장버튼 */}
                            <Button
                                onClick={submitHandler}
                                style={{
                                    fontSize: 12,
                                    marginLeft: 168,
                                    backgroundColor: "rgb(55, 193, 213)",
                                    color: "white",
                                }}
                            >
                                업로드
                            </Button>
                            <Button
                                type="primary"
                                onClick={onSubmit}
                                loading={loading}
                                style={{ fontSize: 12, marginLeft: 5 }}
                            >
                                실행하기
                            </Button>
                        </div>
                        {
                            fileIndex !== null
                                ?
                                (
                                    <>
                                        <div
                                            style={{
                                                width: "100%",
                                                display: "flex",
                                                flexDirection: "column",
                                                backgroundColor: "#f1f1f1",
                                                // 안쪽 title, text 간격 띄우기
                                                marginLeft: 10,
                                                marginTop: 15,
                                            }}
                                        >
                                            <div
                                                name="title"
                                                style={{ width: "100%", paddingTop: 5, position: "relative" }}
                                            >
                                                {loading ? (
                                                    <div
                                                        style={{
                                                            width: 580,
                                                            height: 455,
                                                            position: "absolute",
                                                            top: 0,
                                                            backgroundColor: "rgba(0, 0, 0, 0.05)",
                                                            display: "flex",
                                                            justifyContent: "center",
                                                            alignItems: "center",
                                                        }}
                                                    >
                                                        <Spin size="large" />
                                                    </div>
                                                ) : (
                                                    <></>
                                                )}

                                                <TextArea
                                                    value={title}
                                                    placeholder="제목을 입력해주세요."
                                                    rows={1}
                                                    bordered={false}
                                                    maxLength={20}
                                                    onChange={(e) => onChangeTitle(e)}
                                                    style={{
                                                        height: "50px",
                                                        resize: "none",
                                                        fontSize: "20px",
                                                        fontWeight: "700",
                                                    }}
                                                />
                                            </div>
                                            <div name="text" style={{ width: "100%" }}>
                                                <TextArea
                                                    value={text}
                                                    placeholder="완료하려면 텍스트를 입력하고 실행하기 버튼을 눌러주세요."
                                                    rows={16}
                                                    bordered={false}
                                                    showCount
                                                    maxLength={3800}
                                                    onChange={(e) => onChangeText(e)}
                                                    style={{
                                                        minHeight: "400px",
                                                        resize: "none",
                                                        fontSize: "15px",
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div
                                            className="console"
                                            style={{
                                                width: "100%",
                                                height: "120px",
                                                backgroundColor: "#1e232e",
                                                marginLeft: 10,
                                                paddingTop: "10px",
                                                position: "relative",
                                                marginTop: 30,
                                            }}>
                                            {loading ? (
                                                <div
                                                    style={{
                                                        width: 580,
                                                        height: 130,
                                                        top: 0,
                                                        position: "absolute",
                                                        backgroundColor: "rgba(0, 0, 0, 0.05)",
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <Spin size="large" />
                                                </div>
                                            ) : (
                                                <></>
                                            )}
                                            <div
                                                style={{ fontSize: "14px", color: "white", marginLeft: "11px" }}
                                            >
                                                결과 화면
                                            </div>
                                            <TextArea
                                                bordered={false}
                                                className="outputText"
                                                style={{ color: "white", height: "80px", resize: "none" }}
                                                value={outputTokens}
                                            />
                                        </div>
                                    </>
                                )
                                :
                                (
                                    <>
                                        <div
                                            style={{
                                                width: "100%",
                                                display: "flex",
                                                flexDirection: "column",
                                                marginLeft: 10,
                                                marginTop: 15,
                                                backgroundColor: "rgb(163, 163, 163)"
                                            }}>
                                            <div
                                                name="title"
                                                style={{ width: "100%", paddingTop: 5, position: "relative" }}
                                            >
                                                <TextArea placeholder="파일을 선택해주세요." disabled bordered={false} style={{ backgroundColor: "rgb(163, 163, 163)", height: 50, resize: "none", fontSize: 20, fontWeight: 700 }} />
                                            </div>
                                            <div name="text" style={{ width: "100%" }}>
                                                <TextArea
                                                    rows={16}
                                                    bordered={false}
                                                    disabled
                                                    style={{
                                                        minHeight: "400px",
                                                        resize: "none",
                                                        fontSize: "15px",
                                                        backgroundColor: "rgb(163, 163, 163)"
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div
                                            className="console"
                                            style={{
                                                width: "100%",
                                                height: "120px",
                                                backgroundColor: "#1e232e",
                                                marginLeft: 10,
                                                paddingTop: "10px",
                                                position: "relative",
                                                marginTop: 30,
                                            }}>
                                            <div
                                                style={{ fontSize: "14px", color: "white", marginLeft: "11px", pointerEvents: "none" }}
                                            >
                                                결과 화면
                                            </div>
                                            <TextArea
                                                bordered={false}
                                                className="outputText"
                                                disabled
                                                style={{ color: "white", height: "80px", resize: "none" }}
                                            />
                                        </div>
                                    </>
                                )
                        }
                    </div>

                    <div
                        className="main_right"
                        style={{
                            width: 150,
                            height: 780,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            marginLeft: 20,
                            border: "1px solid #e7e7e7",
                            padding: "10px",
                            overflowY: "scroll",
                        }}
                    >
                        <div style={{ width: "100%", height: "100%" }}>
                            {files.map((file, index) => {
                                return (
                                    <div
                                        ref={(element) => {
                                            cardRefs.current[index] = element;
                                        }}
                                        // eslint-disable-next-line
                                        id={index == fileIndex ? "cardActive" : "card"}
                                        className={index}
                                        key={uuid()}
                                        style={{
                                            width: "130px",
                                            height: "100px",
                                            marginTop: "10px",
                                            display: "flex",
                                            flexDirection: "column",
                                            cursor: "pointer",
                                            borderBottom: "1px solid #e7e7e7",
                                            //   justifyContent: "center",
                                            position: "relative",
                                        }}
                                        onClick={(e) => {
                                            selectFile(e);
                                        }}
                                    >
                                        {index > 0 ? (
                                            <div
                                                // eslint-disable-next-line
                                                id={
                                                    // eslint-disable-next-line
                                                    index == fileIndex ? "DeleteBtnActive" : "DeleteBtn"
                                                }
                                                className={index}
                                                onClick={deleteFile}
                                                style={{
                                                    color: "red",
                                                    width: 32,
                                                    fontSize: 12,
                                                    marginLeft: 100,
                                                }}
                                            >
                                                제거
                                            </div>
                                        ) : (
                                            <div style={{ height: 16 }}></div>
                                        )}
                                        <div
                                            className={index}
                                            style={{
                                                fontSize: 14,
                                                fontWeight: "bold",
                                                marginTop: 10,
                                            }}
                                        >
                                            {file.name.length > 8
                                                ? file.name.slice(0, 8) + "..."
                                                : file.name}
                                        </div>
                                        <div className={index} style={{ fontSize: 12 }}>
                                            {file.title.length < 1 ? (
                                                <p className={index}></p>
                                            ) : (
                                                <p className={index}>
                                                    {file.title.length > 12
                                                        ? file.title.slice(0, 10) + "..."
                                                        : file.title}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </>
                // )
            }
        </main>
    );
}

export default ClovaStudio;