import {useState} from 'preact/hooks';
import {Component} from 'preact';
import wonderlandLogo from './assets/wonderland-horizontal-reversed.svg';
import {initializeWonderland} from 'wonderland-react-example';
import './app.css';

class WonderlandApp extends Component {
    componentDidMount() {
        initializeWonderland().then((engine) => {
            engine.onSceneLoaded.once(() => {
                this.setState({engine})
                this.update(engine, this.props);
            });
        });
    }

    update(engine, props) {
        const cube = engine.scene.findByName('Cube')[0];
        const mesh = cube.getComponent('mesh');
        mesh.material.diffuseColor = props.cubeColor;
    }

    render({className}) {
        return <canvas class={className} id="canvas"></canvas>;
    }

    componentDidUpdate(props) {
        if(!this.state.engine) return;

        this.update(this.state.engine, props);
    }
}

export const App = () => {

    const [state, setState] = useState({color: [1.0, 1.0, 0.0, 1.0]});
    function toggleColor() {
        setState({color: [Math.random(), Math.random(), Math.random(), 1.0]});
    }

    return (
        <>
            <div>
                <a href="https://wonderlandengine.com/showcase" target="_blank">
                    <img
                        src={wonderlandLogo}
                        class="logo wonderland"
                        alt="Wonderland Engine logo"
                    />
                </a>
            </div>
            <h1>React Example</h1>
            <div class="card">
                <WonderlandApp className="wonderland-app" cubeColor={state.color}></WonderlandApp>
                <button onClick={toggleColor}>
                    Toggle Cube Color
                </button>
                <p>
                    Edit <code>src/app.jsx</code> and save to test HMR.
                </p>
            </div>
            <p class="read-the-docs">Click on Wonderland Engine logo to learn more.</p>
        </>
    );
}
