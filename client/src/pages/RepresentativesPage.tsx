import React from 'react';
import { RepresentativesPageContentTree, sectionFields, subSectionFields } from '../types/content_objects/content_trees/RepresentativesPageType';
import { ContentObject, newContentDict } from '../types/api_object_types';
import { Col, Row } from 'react-bootstrap';

function renderSubsection(subsection: newContentDict<subSectionFields>) {
    // Generate member rows
    const memberRows = subsection.items.members.items.map((member) =>
        <tr key={member.id}>
            <td>{member.items.role.text}</td>
            <td>{member.items.name.text}</td>
            <td>{member.items.yearCode.text}</td>
            <td><a href={'mailto: ' + member.items.email.text}>{member.items.email.text}</a></td>
        </tr>
    );
    // Render subsection header if it is specified
    if (subsection.items.name?.text) {
        const email = subsection.items.email?.text ? subsection.items.email?.text : '';
        return (
            <>
                <thead>
                    <tr>
                        <th>{subsection.items.name?.text}</th>
                        <th/>
                        <th/>
                        <td><a href={'mailto:' + email}>{email}</a></td>
                    </tr>
                </thead>
                <tbody>
                    {memberRows}
                </tbody>
            </>
        );
    }
    return (
        <tbody>
            {memberRows}
        </tbody>
    );
}

function renderSection(props: newContentDict<sectionFields>) {
    const subsections = props.items.subsections.items.map((subsection) => {
        return renderSubsection(subsection);
    });
    return (
        <div className="styrelsen text-nowrap">
            <Row className='align-items-center'>
                <Col xs={'auto'}><h3>{props.items.name.text}</h3></Col>
                <Col xs={'auto'}>
                    <a href={'mailto:' + props.items.email?.text}>
                        <p className='my-0'>
                            {props.items.email?.text}
                        </p>
                    </a>
                </Col>
            </Row>
            <Row className={'justify-content-center'}>
                <Col xs={11}>
                    <table className='table table-hover'>
                        {subsections}
                    </table>
                </Col>
            </Row>
        </div>);
}

export default function RepresentativesPage(props: ContentObject) {
    const content = props as RepresentativesPageContentTree;

    // TODO Since the different sections are rendered using different tables the tables columns do not always line up
    //  between columns. Maybe make it into one big table, but then formatting of the section headers are more difficult, or
    //  maybe it is possible to solve with divs but that also seams difficult.
    const sections = content.items.sections.items.map((section) =>
        <div key={section.id}>
            {renderSection(section)}
        </div>);

    return (
        <Row className="justify-content-center">
            <Col xl={7} md={10} xs={11}>
                <h1>{content.items.header.text}</h1>
                <div>
                    <p className="pre-wrapped-text">
                        {content.items.introText.text}
                    </p>
                </div>
                {sections}
            </Col>
        </Row>
    );
}
