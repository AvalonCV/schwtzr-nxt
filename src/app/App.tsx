import React from 'react';

import { IRenderer } from 'fela';
import { RendererProvider } from 'react-fela';

import { I18nextProvider } from 'react-i18next';

import { MainLayout } from './components/layout/MainLayout';
import i18next from 'i18next';

interface AppProps {
	fela_renderer: IRenderer;
	i18n_instance: i18next.i18n;
	[key: string]: any;
}
interface AppState {}

export class App extends React.PureComponent<AppProps, AppState> {
	public render(): JSX.Element {
		return (
			<RendererProvider renderer={this.props.fela_renderer}>
				<I18nextProvider i18n={this.props.i18n_instance}>
					<MainLayout>
						<div>Hello &amp; Welcome....</div>
					</MainLayout>
				</I18nextProvider>
			</RendererProvider>
		);
	}
}
