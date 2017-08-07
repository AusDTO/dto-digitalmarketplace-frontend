import React from 'react';
import PropTypes from 'prop-types'
import classNames from 'classnames';

/*
?page={{ page_number }}{% if keyword %}&keyword={{ keyword }}{% endif %}{% for sort_term in sort_terms %}&sort_term={{ sort_term }}{% endfor %}{% if sort_terms %}&sort_order={% if sort_alternate %}{% if sort_order == 'asc' %}desc{% else %}asc{% endif %}{% else %}{{ sort_order }}{% endif %}{% endif %}{% for role in selected_roles %}&role={{ role|replace(' ', '+') }}{% endfor %}
 */

/**
 * TODO:
 * Generate query string for each action below.
 */
const handlePageScroll = () => {
  typeof window !== 'undefined' ? window.scrollTo(0, 250) : '';
}

const Pagination = ({ page, pages, pageCount, onClick, onNext, onBack }) => (
  <div className="pagination">
    <div>
      Page <strong>{page}</strong> of <strong>{pageCount}</strong>
    </div>
    <div>
      <ul className="pagination-controls">
        {/*
          {% if page - 1 > 0 %}
          {% with page_number=page-1, sort_alternate=False, link_label="< Back", sort_terms=sort_terms %}
          {% include '_supplier_pagination_link.html' %}
          {% endwith %}
          {% endif %}
        */}
        { page - 1 > 0 && (
          <a href="#next" onClick={(e) => {
              e.preventDefault();
              handlePageScroll()
              onBack(page - 1);
          }}>&lt; Back</a>
        )}

        {/*
          {% for pg in pages %}
          <li class="{% if pg == page %}current{% endif %}">
            {% if pg != '...' %}
            {% with page_number=pg, sort_alternate=False, link_label=pg, sort_terms=sort_terms  %}
            {% include '_supplier_pagination_link.html' %}
            {% endwith %}
            {% else %}
            <span>{{ pg }}</span>
            {% endif %}
          </li>
          {% endfor %}
        */}
        {pages.map((pg, i) => (
          <li key={i} className={classNames({
            'current': pg === page
          })}>
          {pg !== '...' ? (
            <a href="#pg" onClick={(e) => {
              e.preventDefault();
              handlePageScroll()
              onClick(pg);
            }}>{pg}</a>
          ) : (
            <span>{pg}</span>
          )}
          </li>
        ))}

        {/*
          {% if page + 1 <= num_pages %}
          {% with page_number=page+1, sort_alternate=False, link_label="Next >", sort_terms=sort_terms  %}
          {% include '_supplier_pagination_link.html' %}
          {% endwith %}
          {% endif %}
        */}
        {page + 1 <= pageCount && (
          <a href="#next" onClick={(e) => {
              e.preventDefault();
              handlePageScroll()
              onNext(page + 1);
          }}>Next &gt;</a>
        )}
      </ul>
    </div>
  </div>
);

Pagination.defaultProps = {
  pages: [],
  page: 1,
  pageCount: 1,
  onNext: () => {},
  onBack: () => {},
  onClick: () => {}
}

Pagination.propTypes = {
  pages: PropTypes.array.isRequired,
  page: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  onNext: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Pagination;
